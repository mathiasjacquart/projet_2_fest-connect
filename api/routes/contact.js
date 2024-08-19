const express = require("express");
const { sendForm } = require("../controllers/contact-controller");
const router = express.Router()
router.post("/", sendForm);

module.exports = router