const {Schema, model} = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
      trim: true
    },

    description: {type: String, minLength: 5, maxLength: 10000}
  },
  {timestamps: true}
);

const Entity = model('Category', schema);
module.exports = Entity;
