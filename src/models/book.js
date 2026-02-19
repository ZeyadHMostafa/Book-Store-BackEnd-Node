const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:
  {type: String, required: true, trim: true},

  author:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },

  category:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  price:
  {type: Number, required: true, min: 0},

  description:
  {type: String},

  bookCover:
  {type: String, required: true},

  stock:
  {type: Number, default: 0},

  averageRating:
  {type: Number, default: 0},

  numReviews:
  {type: Number, default: 0}
}, {timestamps: true});

schema.index({name: 1});

// TODO: Change this to a sutable entity name
const Entity = mongoose.model('Book', schema);
module.exports = Entity;
