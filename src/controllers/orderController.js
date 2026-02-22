const orderModel = require('../models/order');
const {ApiError} = require('../utils/apiError');
const BaseController = require('../utils/baseController');

class OrderController extends BaseController {
  constructor() {
    super(orderModel);
  }

  async getAll(req) {
    return await orderModel.find().populate('user', 'name email').populate('items.book', 'name price');
  }

  async getById(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Order ID is required');
    const order = await orderModel.findById(id).populate('user', 'name email').populate('items.book', 'name price');
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
  }

  async create(req) {
    return await orderModel.create(req.body);
  }

  async update(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Order ID is required');
    const order = await orderModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
  }

  async delete(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Order ID is required');
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) throw new ApiError(404, 'Order not found');
    return {message: 'Order deleted successfully'};
  }
}

module.exports = new OrderController();
