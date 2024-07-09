
const express = require("express");

const {getCategory, getCategories, updateCategory, deleteCategory, createCategory} = require("../controllers/category-controller")
const router = express.Router();
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory); 
router.delete("/:id", deleteCategory); 
router.post("/", createCategory); 



module.exports = router;