const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
      trim: true
    },

    bio: {type: String, required: true, minLength: 1, maxLength: 10000}
  },
  {timestamps: true}
);

schema.index({name: 1});

const Entity = mongoose.model('Author', schema);
module.exports = Entity;
