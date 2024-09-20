// controllers/location-controller.js

const axios = require("axios");
const Location = require("../models/location.schema")

const fetchAndStoreLocations = async (req, res) => {
    try {
        // Récupérer les régions
        const regionsResponse = await axios.get("https://geo.api.gouv.fr/regions");
        const regions = regionsResponse.data;

        for (const region of regions) {
            // Récupérer les départements pour chaque région
            const departmentsResponse = await axios.get(`https://geo.api.gouv.fr/regions/${region.code}/departements`);
            const departments = departmentsResponse.data;

            for (const department of departments) {
                // Récupérer les communes pour chaque département
                const citiesResponse = await axios.get(`https://geo.api.gouv.fr/departements/${department.code}/communes`);
                const cities = citiesResponse.data;

                for (const city of cities) {
                  
                    const location = new Location({
                        region: region.nom,
                        city: city.nom,
                        postalCode: city.codesPostaux[0], 
                        
                        
                    });

                    await location.save();
                    console.log(`Saved location: ${city.nom}, ${region.nom} ${city.codesPostaux[0]}`);
                }
            }
        }
        console.log("All locations have been stored in the database.");
        res.status(200).json({ message: "All locations have been stored in the database." });
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API." });
    }
};
const getAllLocations = async (req, res) => {
    
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { fetchAndStoreLocations, getAllLocations };
