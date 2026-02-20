const {Schema, model} = require('mongoose');

const schema = new Schema({
  name:
  {type: String, required: true, unique: true, trim: true},

  description:
  {type: String}

}, {timestamps: true});

const Entity = model('Category', schema);
module.exports = Entity;
