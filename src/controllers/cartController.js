const cartModel = require('../models/cart');
const BaseController = require('../utils/baseController');

class CartController extends BaseController {
  constructor() {
    super(cartModel);
  }

  transformCart(cart) {
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

  async getCart(userId) {
    const cart = await cartModel.findOne({user: userId}).populate('items.book');

    if (!cart) return {items: [], totalAmount: 0, itemCount: 0};

    // Transform data for the UI
    return this.transformCart(cart);
  }

  async upsertToCart(userId, bookId, quantity) {
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
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({book: bookId, quantity});
      }
    }
    cart = await (await cart.save()).populate('items.book');

    // Transform data for the UI
    return this.transformCart(cart);
  }

  async removeFromCart(userId, bookId) {
    const cart = await this.model
      .findOneAndUpdate(
        {user: userId},
        {$pull: {items: {book: bookId}}},
        {new: true}
      )
      .populate('items.book');

    // Transform data for the UI
    return this.transformCart(cart);
  }
}

module.exports = new CartController();
