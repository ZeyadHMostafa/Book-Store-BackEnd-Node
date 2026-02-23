const mongoose = require('mongoose');
const boolModel = require('../models/Book');
const cartModel = require('../models/Cart');
const orderModel = require('../models/order');
const {ApiError} = require('../utils/apiError');
const BaseController = require('../utils/baseController');

class OrderController extends BaseController {
  constructor() {
    super(orderModel);
  }

  async placeOrder(userId, shippingAddress, paymentMethod) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Fetch Cart
      const cart = await cartModel
        .findOne({user: userId})
        .populate('items.book')
        .session(session);
      if (!cart || cart.items.length === 0) {
        throw new ApiError(400, 'Your cart is empty.');
      }

      let totalAmount = 0;
      const orderItems = [];

      // 2. Validate Stock and Calculate Prices
      for (const item of cart.items) {
        if (item.book.stock < item.quantity) {
          throw new ApiError(400, `Insufficient stock for: ${item.book.title}`);
        }

        // Deduct Stock Atomics
        await boolModel.findByIdAndUpdate(
          item.book._id,
          {$inc: {stock: -item.quantity}},
          {session}
        );

        totalAmount += item.book.price * item.quantity;
        orderItems.push({
          book: item.book._id,
          quantity: item.quantity,
          priceAtPurchase: item.book.price
        });
      }

      // 3. Create the Order
      const newOrder = orderModel.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod
      });

      const savedOrder = await newOrder.save({session});

      // 4. Clear the User's Cart
      await cartModel.findOneAndDelete({user: userId}).session(session);

      await session.commitTransaction();
      session.endSession(); // end session before returning
      return savedOrder;
    } catch (error) {
      await session.abortTransaction();
      session.endSession(); // end session before returning even on error
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
