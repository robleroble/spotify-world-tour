const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  //destructure args??? or just pass all directly into model func
  try {
    // pass query/body args to model to get music
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
