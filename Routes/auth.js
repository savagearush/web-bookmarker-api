const express = require("express");
const router = express.Router();
const { User } = require("../modals/Users");
const auth = require("../middleware/auth");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ type: "danger", message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ type: "warning", message: "User not Exist." });

  compare(req.body.password, user.password, function (err, result) {
    if (result !== true) {
      return res
        .status(400)
        .json({ type: "danger", message: "Incorrect Password" });
    }

    const token = user.generateToken();

    return res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({ type: "success", message: "Logged In Successfully." });
  });
});

function validate(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(100).required(),
  });

  return schema.validate(input);
}

module.exports = router;
