const { json } = require("express");
const users = require("../Routes/users");
const bookmark = require("../Routes/bookmark");
const auth = require("../Routes/auth");
const resetpassword = require("../Routes/resetpassword");
const changepassword = require("../Routes/changepassword");
module.exports = (app) => {
  app.use(json());
  app.use("/users", users);
  app.use("/bookmark", bookmark);
  app.use("/auth", auth);
  app.use("/resetpassword", resetpassword);
  app.use("/changepassword", changepassword);
};
