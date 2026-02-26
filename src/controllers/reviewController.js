const reviewModel = require('../models/review');
const {ApiError} = require('../utils/apiError');
const BaseController = require('../utils/baseController');

class ReviewController extends BaseController {
  constructor() {
    super(reviewModel);
  }

  async create(req) {
    const review = await this.model.create(req.body);
    return await this.model.findById(review._id).populate('user', 'firstName lastName');
  }

  async update(req) {
    const {id} = req.params;
    const review = await this.model.findById(id);
    if (!review) throw new ApiError(404, 'Review not found');

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new ApiError(403, 'You are not allowed to update this review');
    }

    const updatedReview = await this.model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'firstName lastName');
    return updatedReview;
  }

  async delete(req) {
    const {id} = req.params;
    const review = await this.model.findById(id);
    if (!review) throw new ApiError(404, 'Review not found');

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new ApiError(403, 'You are not allowed to delete this review');
    }

    await review.deleteOne();
    return {message: 'Review deleted successfully'};
  }
}

module.exports = new ReviewController();
