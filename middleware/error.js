module.exports = function (err, req, res, next) {
  console.log("Req : ", req);
  if (err) {
    console.log(err);
    res.status(500).send("Something failed.");
  }
};
