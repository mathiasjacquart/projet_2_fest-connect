const Prestataire = require("../models/prestataire.schema")

// Get all prestataires
const getPrestataires = async (req, res) => {
    console.log(req.body);
    try {
      const prestataires = await Prestataire.find();
      res.status(200).json(prestataires);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get single prestataire by ID
  const getPrestataire = async (req, res) => {
    try {
      const prestataire = await Prestataire.findById(req.params.id);
      if (!prestataire) return res.status(404).json({ message: 'Prestataire not found' });
      res.status(200).json(prestataire);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update prestataire by ID
  const updatePrestataire = async (req, res) => {
    try {
      const prestataire = await Prestataire.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!prestataire) return res.status(404).json({ message: 'Prestataire not found' });
      res.status(200).json(prestataire);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete prestataire by ID
  const deletePrestataire = async (req, res) => {
    try {
      const prestataire = await Prestataire.findByIdAndDelete(req.params.id);
      if (!prestataire) return res.status(404).json({ message: 'Prestataire not found' });
      res.status(200).json({ message: 'Prestataire deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createPrestataire = async (req, res) => { 
    try {
      const prestataire = new Prestataire (req.body) 
      await prestataire.save();
      res.status(200).json(prestataire)
    } catch (error) {
      res.status(500).json ({ error : error.message})
    }
  }


module.exports = {createPrestataire, deletePrestataire, updatePrestataire, getPrestataire, getPrestataires}
  