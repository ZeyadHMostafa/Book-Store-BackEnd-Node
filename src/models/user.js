const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const {generateToken} = require('../services/authService');

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 100
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 100
    },

    dob: {type: Date, required: true},

    // Note: this is technically the hash not the password
    password: {type: String, required: true, select: false},

    role: {type: String, enum: ['user', 'admin'], default: 'user'}
  },
  {timestamps: true}
);

// Hash password before saving
schema.pre('save', async function () {
  if (!this.isModified('password')) return this;
  this.password = bcrypt.hashSync(this.password, 10);
  return this;
});

// Instance method to check password
schema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT token
schema.methods.generateToken = async function () {
  return await generateToken(this._id, this.role);
};

const Entity = mongoose.model('User', schema);
module.exports = Entity;
