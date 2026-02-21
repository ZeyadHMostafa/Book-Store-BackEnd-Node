const bookModel = require('../models/book');
const {ApiError} = require('../utils/apiError');
const APIFeatures = require('../utils/apiFeatures');
const BaseController = require('../utils/baseController');

class BookController extends BaseController {
  constructor() {
    super(bookModel);
  }

  async getAll(req) {
    const features = new APIFeatures(bookModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await features.query;
  }

  async create(req) {
    return await bookModel.create(req.body);
  }

  async update(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Book ID is required');
    const book = await bookModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!book) throw new ApiError(404, 'Book not found');
    return book;
  }

  async delete(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Book ID is required');
    const book = await bookModel.findByIdAndDelete(id);
    if (!book) throw new ApiError(404, 'Book not found');
    return {message: 'Book deleted successfully'};
  }

  async getById(req) {
    const id = req.params.id;
    if (!id) throw new ApiError(400, 'Book ID is required');
    const book = await bookModel.findById(id);
    if (!book) throw new ApiError(404, 'Book not found');
    return book;
  }

  async getBooksByAuthor(req) {
    const authorId = req.params.authorId;
    if (!authorId) throw new ApiError(400, 'Author ID is required');
    const books = await bookModel.find({author: authorId});
    if (!books) throw new ApiError(404, 'Books not found');
    return books;
  }

  async getBooksByCategory(req) {
    const categoryId = req.params.categoryId;
    if (!categoryId) throw new ApiError(400, 'Category ID is required');
    const books = await bookModel.find({category: categoryId});
    if (!books) throw new ApiError(404, 'Books not found');
    return books;
  }
}

module.exports = new BookController();
