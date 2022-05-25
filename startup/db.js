const { connect } = require("mongoose");
const { config } = require("dotenv");
config({ path: "config/config.env" });

module.exports = () => {
  connect(process.env.DEV_MONGO_URI)
    .then(() => {
      console.log("Database connected Successfully.");
    })
    .catch((err) => {
      console.log(err);
    });
};
