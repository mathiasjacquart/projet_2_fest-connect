const {getReview, getReviews, updateReview, deleteReview, createReview} = require("../controllers/review-controller")
const express = require("express");
const router = express.Router();
router.get("/", getReviews);
router.get("/:id", getReview);
router.put("/:id", updateReview); 
router.delete("/:id", deleteReview); 
router.post("/", createReview); 



module.exports = router;