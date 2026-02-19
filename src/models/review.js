const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  book:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },

  user:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  rating:
  {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  comment:
  {
    type: String,
    trim: true
  }
}, {timestamps: true});

schema.index({book: 1, user: 1}, {unique: true});

const Review = mongoose.model('Review', schema);
module.exports = Review;
