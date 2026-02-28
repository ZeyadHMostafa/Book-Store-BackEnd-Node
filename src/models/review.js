const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },

    comment: {
      type: String,
      trim: true
    }
  },
  {timestamps: true}
);

schema.index({book: 1, user: 1}, {unique: true});

schema.statics.updateRatings = async function (bookId) {
  await mongoose.model('Book').recalculateRatingStats(bookId);
};

schema.post('save', async function () {
  await this.constructor.updateRatings(this.book);
});

schema.pre(/^findOneAnd/, async function () {
  this.r = await this.clone().findOne();
});

schema.post(/^findOneAnd/, async function () {
  if (this.r) {
    await this.r.constructor.updateRatings(this.r.book);
  }
});

schema.post('remove', async function () {
  await this.constructor.updateRatings(this.book);
});

const Review = mongoose.model('Review', schema);
module.exports = Review;
