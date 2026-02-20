const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email:
  {type: String, required: true, trim: true, unique: true, lowercase: true},

  firstName:
  {type: String, required: true, trim: true},

  lastName:
  {type: String, required: true, trim: true},

  dob:
  {type: Date, required: true},

  password:
  {type: String, required: true, minlength: 8, select: false},

  role:
  {type: String, enum: ['user', 'admin'], default: 'user'}

}, {timestamps: true});

// Hash password before saving
schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to check password
schema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Entity = mongoose.model('User', schema);
module.exports = Entity;
