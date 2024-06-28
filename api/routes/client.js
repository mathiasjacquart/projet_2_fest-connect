const {getClient, getClients, updateClient, deleteClient, createClient} = require("../controllers/client-controller")
const express = require("express");
const router = express.Router();
router.get("/", getClients);
router.get("/:id", getClient);
router.put("/:id", updateClient); 
router.delete("/:id", deleteClient); 
router.post("/", createClient); 



module.exports = router;