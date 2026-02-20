const authorModel = require('../models/author');
const BaseController = require('../utils/baseController');

class AuthorController extends BaseController {
  constructor() {
    super(authorModel);
  }
}

module.exports = new AuthorController();
