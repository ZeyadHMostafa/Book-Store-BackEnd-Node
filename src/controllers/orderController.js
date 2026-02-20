const orderModel = require('../models/order');
const BaseController = require('../utils/baseController');

class OrderController extends BaseController {
  constructor() {
    super(orderModel);
  }
}

module.exports = new OrderController();
