const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookmarkSchema = Schema({
  webName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  webUrl: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Bookmark = model("bookmarks", bookmarkSchema);

function validateBookmark(data) {
  const schema = Joi.object({
    webName: Joi.string().min(5).max(50).required(),
    webUrl: Joi.string().min(5).max(100).required(),
  });

  return schema.validate(data);
}

exports.Bookmark = Bookmark;
exports.validateBookmark = validateBookmark;
