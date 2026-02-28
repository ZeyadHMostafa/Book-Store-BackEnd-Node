const authorModel = require('../models/author');
const {ApiError} = require('../utils/apiError');
const APIFeatures = require('../utils/apiFeatures');
const BaseController = require('../utils/baseController');

class AuthorController extends BaseController {
  constructor() {
    super(authorModel);
  }

  async getAll(req) {
    const features = new APIFeatures(authorModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await features.query;
  }

  async create(req) {
    return await authorModel.create(req.body);
  }

  async update(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Author ID is required');
    const author = await authorModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!author) throw new ApiError(404, 'Author not found');
    return author;
  }

  async delete(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Author ID is required');
    const author = await authorModel.findByIdAndDelete(id);
    if (!author) throw new ApiError(404, 'Author not found');
    return {message: 'Author deleted successfully'};
  }

  async getById(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Author ID is required');
    const author = await authorModel.findById(id);
    if (!author) throw new ApiError(404, 'Author not found');
    return author;
  }
}

module.exports = new AuthorController();
