const cartModel = require('../models/cart');
const BaseController = require('../utils/baseController');

class CartController extends BaseController {
  constructor() {
    super(cartModel);
  }

  async getCart(userId) {
    const cart = await this.model
      .findOne({user: userId})
      .populate('items.book');
    return cart || {user: userId, items: []};
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
