const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const userrouter = require("./user");
const { accountrouter } = require("./account");
const router = express.Router();

router.use(express.json());

router.use("/user", userrouter);
router.use("/account", accountrouter);
router.use((req, res) => {
  res.send("404 Not Found");
});

module.exports = router;
