const cartModel = require('../models/cart');
const BaseController = require('../utils/baseController');

class CartController extends BaseController {
  constructor() {
    super(cartModel);
  }

  async getCart(userId) {
    const cart = await cartModel.findOne({user: userId}).populate('items.book');

    if (!cart) return {items: [], totalAmount: 0, itemCount: 0};

    // Transform data for the UI
    const items = cart.items.map((item) => ({
      book: item.book,
      quantity: item.quantity,
      itemTotal: item.book.price * item.quantity
    }));

    const totalAmount = items.reduce((acc, item) => acc + item.itemTotal, 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      id: cart.id,
      items,
      totalAmount,
      itemCount
    };
  }

  async addToCart(userId, bookId, quantity) {
    let cart = await this.model.findOne({user: userId});

    if (!cart) {
      cart = await this.model.create({
        user: userId,
        items: [{book: bookId, quantity}]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({book: bookId, quantity});
      }
    }
    return await cart.save();
  }

  async removeFromCart(userId, bookId) {
    return await this.model.findOneAndUpdate(
      {user: userId},
      {$pull: {items: {book: bookId}}},
      {new: true}
    );
  }
}

module.exports = new CartController();
