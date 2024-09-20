
const express = require('express');
const { fetchAndStoreLocations, getAllLocations } = require('../controllers/locations-controller')

const router = express.Router();

router.post('/fetch-locations', fetchAndStoreLocations);
router.get("/", getAllLocations )

module.exports = router;
