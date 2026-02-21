const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const process = require('node:process');
const {ApiError} = require('../utils/apiError');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const schema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },

    price: {type: Number, required: true, min: 0},

    description: {type: String},

    bookCover: {type: String, required: true},

    stock: {type: Number, default: 0},

    averageRating: {type: Number, default: 0},

    numReviews: {type: Number, default: 0}
  },
  {timestamps: true}
);

schema.index({name: 1});

schema.pre('save', async function () {
  if (!this.isModified('bookCover')) return;
  if (this.bookCover.startsWith('http') || this.bookCover.startsWith('https')) return;
  try {
    const uploadResponse = await cloudinary.uploader.upload(this.bookCover, {
      folder: 'book-store/covers'
    });
    this.bookCover = uploadResponse.secure_url;
  } catch (err) {
    throw new ApiError(400, `Error uploading image to Cloudinary: ${err.message}`);
  }
});

schema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  if (!update.bookCover) return;
  if (update.bookCover.startsWith('http') || update.bookCover.startsWith('https')) return;

  try {
    const uploadResponse = await cloudinary.uploader.upload(update.bookCover, {
      folder: 'book-store/covers'
    });
    update.bookCover = uploadResponse.secure_url;
    this.setUpdate(update);
  } catch (err) {
    throw new ApiError(400, `Error uploading image to Cloudinary: ${err.message}`);
  }
});

schema.pre('save', function () {
  if (this.stock === 0) {
    this.stock = 1;
  }
});

schema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update && update.stock === 0) {
    update.stock = 1;
    this.setUpdate(update);
  }
});

const Entity = mongoose.model('Book', schema);
module.exports = Entity;
