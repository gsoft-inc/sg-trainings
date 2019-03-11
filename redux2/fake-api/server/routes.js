const express = require("express");
const router = express.Router();

router.use("/amazon", require("./amazon"));

module.exports = router;
