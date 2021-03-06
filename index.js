const express = require("express");
const app = express();
const { config } = require("dotenv");
const morgan = require("morgan");
const { join } = require("path");
require("express-async-errors");
const cors = require("cors");

config({ path: "config/config.env" });

if (process.env.NODE_ENV == "development") app.use(morgan("tiny"));

if (!process.env.JWT_PRIVATE_KEY) {
  console.error("FATAL EnsvRORR : JWT_PRIVATE_KEY is not defined.");
  process.exit(1);
}

app.use(cors());
app.use(express.static(join(__dirname, "\\public")));
app.use(express.urlencoded({ extended: false }));

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
