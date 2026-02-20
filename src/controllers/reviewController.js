const reviewModel = require('../models/review');
const BaseController = require('../utils/baseController');

class ReviewController extends BaseController {
  constructor() {
    super(reviewModel);
  }
}

module.exports = new ReviewController();
