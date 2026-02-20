const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},

    bio: {type: String, required: true}
  },
  {timestamps: true}
);

schema.index({name: 1});

const Entity = mongoose.model('Author', schema);
module.exports = Entity;
