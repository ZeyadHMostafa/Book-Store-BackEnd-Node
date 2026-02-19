const mongoose = require('mongoose');

// TODO: This is just a sample. all the content here should bechanged before deploying the project!!

const schema = new mongoose.Schema({
  name:
  {type: String, required: true, trim: true},

  bio:
  {type: String, required: true}

}, {timestamps: true});

schema.index({name: 1});

const Entity = mongoose.model('Author', schema);
module.exports = Entity;
