const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    phone: {type: String, required: true},

    shippingAddress: {type: String, required: true},

    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        },
        quantity: {type: Number, required: true},
        priceAtPurchase: {type: Number, required: true}
      }
    ],

    totalAmount: {type: Number, required: true},

    status: {
      type: String,
      enum: ['processing', 'out for delivery', 'delivered', 'cancelled'],
      default: 'processing'
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'Stripe', 'PayPal'],
      default: 'COD'
    }
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

schema.index({user: 1, createdAt: -1});

const Order = mongoose.model('Order', schema);
module.exports = Order;
