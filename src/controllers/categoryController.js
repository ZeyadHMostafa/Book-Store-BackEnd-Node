const categoryModel = require('../models/category');
const BaseController = require('../utils/baseController');

class CategoryController extends BaseController {
  constructor() {
    super(categoryModel);
  }
}

module.exports = new CategoryController();
