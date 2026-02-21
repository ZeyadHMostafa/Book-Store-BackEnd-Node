const categoryModel = require('../models/category');
const {ApiError} = require('../utils/apiError');
const APIFeatures = require('../utils/apiFeatures');
const BaseController = require('../utils/baseController');

class CategoryController extends BaseController {
  constructor() {
    super(categoryModel);
  }

  async getAll(req) {
    const features = new APIFeatures(categoryModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await features.query;
  }

  async create(req) {
    return await categoryModel.create(req.body);
  }

  async update(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Category ID is required');
    const category = await categoryModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  }

  async delete(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Category ID is required');
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) throw new ApiError(404, 'Category not found');
    return {message: 'Category deleted successfully'};
  }

  async getById(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Category ID is required');
    const category = await categoryModel.findById(id);
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  }
}

module.exports = new CategoryController();
