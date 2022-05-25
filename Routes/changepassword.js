const Router = require("express").Router;
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../modals/Users");
const { genSalt, hash } = require("bcrypt");

router.post("/", async (req, res) => {
  const { token, new_password } = req.body;
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (error, data) => {
    if (error)
      return res
        .status(400)
        .json({ type: "warning", message: "Link Expired ! Try again" });
    const result = updatePassword(data["_id"], new_password);
    return res
      .status(200)
      .json({ type: "success", message: "Password Changed." });
  });
});

function updatePassword(id, password) {
  genSalt(10, (err, salt) => {
    hash(password, salt, async (err, hashedPassword) => {
      return await User.findByIdAndUpdate(id, {
        $set: {
          password: hashedPassword,
        },
      });
    });
  });
}

module.exports = router;
