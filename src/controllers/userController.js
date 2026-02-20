const userModel = require('../models/user');
const BaseController = require('../utils/baseController');

class UserController extends BaseController {
  constructor() {
    super(userModel);
  }
}

module.exports = new UserController();
