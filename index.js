const express = require("express");
const app = express();
const { config } = require("dotenv");
const morgan = require("morgan");
const { join } = require("path");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
config({ path: "config/config.env" });

if (process.env.NODE_ENV == "development") app.use(morgan("tiny"));

if (!process.env.JWT_PRIVATE_KEY) {
  console.error("FATAL ERROR : JWT_PRIVATE_KEY is not defined.");
  process.exit(1);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(join(__dirname, "\\public")));
app.use(express.urlencoded({ extended: false }));

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
