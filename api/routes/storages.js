const express = require("express");
const { getStorage, SaveURL} = require("../controllers/storage-controller");

const router = express.Router();

router.get("/", getStorage);

router.post("saveURL", SaveURL);

module.exports = router;
