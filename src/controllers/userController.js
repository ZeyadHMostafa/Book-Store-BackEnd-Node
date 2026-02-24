const userModel = require('../models/user');
const {ApiError} = require('../utils/apiError');
const BaseController = require('../utils/baseController');

class UserController extends BaseController {
  constructor() {
    super(userModel);
  }

  async register(data) {
    const user = await this.model.create(data);
    const token = await user.generateToken();
    return {token, message: 'registration complete'};
  }

  async acquireToken(data) {
    const user = await this.model
      .findOne({email: data.email})
      .select('+password');
    if (!user) throw new ApiError(401, 'incorrect credentials');

    const valid = await user.correctPassword(data.password);
    if (!valid) throw new ApiError(401, 'incorrect credentials');

    const token = await user.generateToken();
    return {token, message: 'token acquired succesfully'};
  }

  async getProfile(userId) {
    return await this.getById(userId);
  }

  async updateProfile(userId, data) {
    // TODO: does updating with someone else's email cause a problem?
    return await this.update(userId, data);
  }
}

module.exports = new UserController();
