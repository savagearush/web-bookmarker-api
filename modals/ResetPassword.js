const { Schema, model } = require("mongoose");

const ResetSchema = Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  token: {
    type: String,
    minlength: 5,
    maxlength: 10000,
  },  
});

const ResetPassword = model("ResetPassword", ResetSchema);

exports.ResetPassword = ResetPassword;
