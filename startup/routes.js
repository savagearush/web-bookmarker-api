const { json } = require("express");
const users = require("../Routes/users");
const bookmark = require("../Routes/bookmark");
const auth = require("../Routes/auth");

module.exports = (app) => {
  app.use(json());
  app.use("/users", users);
  app.use("/bookmark", bookmark);
  app.use("/auth", auth);
};
