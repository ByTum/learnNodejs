const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide us your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Pleace provide valid email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a passwordConfirm!'],
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
