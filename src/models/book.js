const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 100
    },

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

    price: {type: Number, required: true, min: 0, max: 1000000000},

    description: {type: String, required: true, minLength: 5, maxLength: 10000},

    bookCover: {type: String, required: true},

    stock: {type: Number, default: 1},

    averageRating: {type: Number, default: 0, min: 0, max: 5},

    numReviews: {type: Number, default: 0, min: 0}
  },
  {timestamps: true}
);

schema.index({name: 1});

schema.pre(/^find/, function () {
  this.populate({path: 'author', select: 'name'}).populate({
    path: 'category',
    select: 'name'
  });
});

schema.set('toJSON', {virtuals: true});
schema.set('toObject', {virtuals: true});

// Virtual populate for the Review model (keeps reviews in their own collection).
schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'book'
});

schema.statics.recalculateRatingStats = async function (bookId) {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    {$match: {book: new mongoose.Types.ObjectId(bookId)}},
    {
      $group: {
        _id: '$book',
        averageRating: {$avg: '$rating'},
        numReviews: {$sum: 1}
      }
    }
  ]);

  const payload =
    stats.length === 0
      ? {averageRating: 0, numReviews: 0}
      : {
          averageRating: stats[0].averageRating,
          numReviews: stats[0].numReviews
        };

  return await this.findByIdAndUpdate(bookId, payload, {new: true});
};

const Entity = mongoose.model('Book', schema);
module.exports = Entity;
