const Router = require("express").Router;
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../modals/Users");
const { messageNow } = require("../mailer/nodeMail");
const { ResetPassword } = require("../modals/ResetPassword");
const { pick } = require("lodash");

router.post("/", async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ type: "danger", message: "Email ID not Exist." });

  res
    .status(200)
    .json({ type: "success", message: "Link send to your Email ID." });

  const token = jwt.sign(pick(user, ["_id"]), process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1m",
  });
  await messageNow(email, token);
});

module.exports = router;
