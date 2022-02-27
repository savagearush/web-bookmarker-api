const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { sign } = require("jsonwebtoken");

const userScheme = Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    trim: true,
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});

userScheme.methods.generateToken = function () {
  return sign(
    { _id: this._id, name: this.fullname },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = model("Users", userScheme);

function validateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string().min(5).max(20).required(),
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  //   return schema.validate(user, { abortEarly: false });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
