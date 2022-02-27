const { Router } = require("express");
const router = Router();
const { genSalt, hash } = require("bcrypt");
const auth = require("../middleware/auth.js");
const { pick } = require("lodash");
const { User, validateUser } = require("../modals/Users");

router.post("/", auth, (req, res) => {
  console.log(req.body);
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ type: "danger", message: error.details[0].message });

  let checkUsername = await User.findOne({
    username: req.body.username,
  });

  let checkEmail = await User.findOne({
    email: req.body.email,
  });

  if (checkEmail) {
    return res
      .status(400)
      .send({ type: "danger", message: "Email Id already exists." });
  }
  if (checkUsername) {
    return res
      .status(400)
      .send({ type: "danger", message: "Username already exist." });
  }

  let user = new User(
    pick(req.body, ["fullname", "username", "email", "password"])
  );

  genSalt(10, function (err, salt) {
    hash(user.password, salt, async (err, hashedPassword) => {
      user.password = hashedPassword;
      const result = await user.save();
      if (!result)
        return res
          .status(400)
          .json({ type: "danger", message: "Account not Created.." });
    });
  });
  const token = user.generateToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .json({ type: "success", message: "Account created Successfully." });
});

module.exports = router;
