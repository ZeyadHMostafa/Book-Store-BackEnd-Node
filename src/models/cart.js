const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1.'],
      default: 1
    }
  },
  {_id: false, label: 'CartItem'}
);

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // One cart per user
    },

    items: [cartItemSchema]
  },
  {timestamps: true}
);

// important for erd generation
mongoose.model('CartItemSchema', cartItemSchema);

const Cart = mongoose.model('Cart', schema);
module.exports = Cart;
