const cartModel = require('../models/cart');
const BaseController = require('../utils/baseController');

class CartController extends BaseController {
  constructor() {
    super(cartModel);
  }
}

module.exports = new CartController();
