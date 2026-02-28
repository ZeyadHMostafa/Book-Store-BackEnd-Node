const {ApiError} = require('./apiError');

class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(query = {}) {
    return await this.model.find(query);
  }

  async count(req) {
    return await this.model.countDocuments(req.query);
  }

  async getById(id) {
    const doc = await this.model.findById(id);
    if (!doc) throw new ApiError(404, 'Resource not found');
    return doc;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const doc = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!doc) throw new ApiError(404, 'Resource not found');
    return doc;
  }

  async delete(id) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw new ApiError(404, 'Resource not found');
    return {message: 'Deleted successfully'};
  }
}

module.exports = BaseController;
