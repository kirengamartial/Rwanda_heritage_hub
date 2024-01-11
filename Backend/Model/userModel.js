// models/userModel.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{timestamps: true});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'useremail', 
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
