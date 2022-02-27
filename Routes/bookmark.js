const { Router } = require("express");
const router = Router();
const { pick } = require("lodash");
const jwt = require("jsonwebtoken");
const { Bookmark, validateBookmark } = require("../modals/Bookmark");

router.get("/save", async (req, res) => {
  const token = req.headers["x-auth-token"];
  const { error } = validateBookmark(req.query);
  if (error)
    return res
      .status(400)
      .json({ type: "danger", message: error.details[0].message });

  req.query.createdBy = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const bookmark = new Bookmark(
    pick(req.query, ["webName", "webUrl", "createdBy"])
  );

  const result = await bookmark.save();

  if (!result)
    return res
      .status(400)
      .json({ type: "danger", message: "Something Went Wrong. Try Later" });

  res.json({ type: "success", message: "Website Added To your List 👍." });
});

router.get("/list", async (req, res) => {
  const token = req.headers["x-auth-token"];
  const user = jwt.decode(token, process.env.JWT_PRIVATE_KEY);

  const data = await Bookmark.find({ createdBy: user["_id"] })
    .populate("createdBy", "_id fullname")
    .select("-createdBy -__v");
  res.send(data);
});

router.delete("/delete/:id", async (req, res) => {
  const bookmarkId = req.params.id;
  const result = await Bookmark.deleteOne({ _id: bookmarkId });

  if (!result)
    return res
      .status(400)
      .json({ type: "danger", message: "Try After Sometime" });

  res.status(200).json({ type: "success", message: "Deleted Successfully." });
});

router.put("/update/:bookmakerId", async (req, res) => {
  const bookmarkId = req.params.bookmakerId;
  const result = await Bookmark.findByIdAndUpdate(
    bookmarkId,
    pick(req.body, ["webName", "webUrl"]),
    { new: true }
  );

  res.status(200).json({
    type: "success",
    message: "Updated Successfully.",
    result,
  });

  if (!result)
    return res
      .status(400)
      .json({ type: "danger", message: "Try After Sometime" });
});

module.exports = router;
