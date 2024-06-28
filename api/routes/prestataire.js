const {getPrestataire, getPrestataires, updatePrestataire, deletePrestataire, createPrestataire} = require("../controllers/prestataire-controller")
const express = require("express");
const router = express.Router();
router.get("/", getPrestataires);
router.get("/:id", getPrestataire);
router.put("/:id", updatePrestataire); 
router.delete("/:id", deletePrestataire); 
router.post("/", createPrestataire); 



module.exports = router;