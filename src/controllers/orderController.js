const bookmodel = require('../models/book');
const cartModel = require('../models/cart');
const orderModel = require('../models/order');
const {ApiError} = require('../utils/apiError');
const BaseController = require('../utils/baseController');

class OrderController extends BaseController {
  constructor() {
    super(orderModel);
  }

  async placeOrder(userId, shippingAddress, paymentMethod) {
    // eslint-disable-next-line no-useless-catch
    try {
    // Fetch Cart
      const cart = await cartModel
        .findOne({user: userId})
        .populate('items.book');
      if (!cart || cart.items.length === 0) {
        throw new ApiError(400, 'Your cart is empty.');
      }

      let totalAmount = 0;
      const orderItems = [];

      // Validate Stock and Calculate Prices
      for (const item of cart.items) {
        if (item.book.stock < item.quantity) {
          throw new ApiError(400, `Insufficient stock for: ${item.book.title}`);
        }

        // Deduct Stock
        await bookmodel.findByIdAndUpdate(
          item.book._id,
          {$inc: {stock: -item.quantity}}
        );

        totalAmount += item.book.price * item.quantity;
        orderItems.push({
          book: item.book._id,
          quantity: item.quantity,
          priceAtPurchase: item.book.price
        });
      }

      const savedOrder = await orderModel.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod
      });

      // Clear the User's Cart
      await cartModel.findOneAndDelete({user: userId});

      return savedOrder;
    } catch (error) {
      throw error;
    }
  }

  async getMyOrders(userId) {
    return await orderModel.find({user: userId}).sort({createdAt: -1});
  }

  async getAllOrders() {
    return await orderModel
      .find()
      .populate('user', 'name email')
      .sort({createdAt: -1});
  }

  async updateStatus(orderId, updateData) {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {$set: updateData},
      {new: true, runValidators: true}
    );

    if (!updatedOrder) throw new ApiError(404, 'Order not found');
    return updatedOrder;
  }
}

module.exports = new OrderController();
