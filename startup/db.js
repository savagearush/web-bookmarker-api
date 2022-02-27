const { connect } = require("mongoose");

module.exports = () => {
  connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected Successfully.");
    })
    .catch((err) => {
      console.log(err);
    });
};
