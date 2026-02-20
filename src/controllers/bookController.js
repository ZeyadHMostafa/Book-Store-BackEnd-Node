const bookModel = require('../models/book');
const BaseController = require('../utils/baseController');

class BookController extends BaseController {
  constructor() {
    super(bookModel);
  }
}

module.exports = new BookController();
