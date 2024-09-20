const Prestataire = require("../models/prestataire.schema")
const Category = require("../models/category.schema")
const User = require("../models/user.schema")

// Get all prestataires
const getPrestataires = async (req, res) => {
    console.log(req.body);
    try {
      const prestataires = await Prestataire.find()
      .populate('userId') // Peuple les détails de l'utilisateur associé
      .populate('service.category') // Peuple les détails de la catégorie de service

      res.status(200).json(prestataires);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get single prestataire by ID
  const getPrestataire = async (req, res) => {
    try {
      const prestataireId =req.params.id
      const prestataire = await Prestataire.findById(prestataireId)
      .populate('userId')
      .populate('service.category') // Peuple les détails de la catégorie

;
      if (!prestataire) 
        {
          return res.status(404).json({ message: 'Prestataire not found' })}
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
      res.status(200).json({message: "Vous avez modifié votre profil avec succès"});
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
      const { businessname, biography, description, service, photo, location, surrounding, userId } = req.body;
      console.log(req.body);
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const category = await Category.findById(service.category);
  
      if (!category) {
        return res.status(400).json({ error: 'Catégorie non trouvée' });
      }

      const subcategories = service.subCategories.map(index => category.subCategories[index]);
      console.log(subcategories);
      

      const subcategoryIds = subcategories.map(subcategory => subcategory._id);
      console.log(subcategoryIds);
      
  

      const newPrestataire = new Prestataire({
        businessname,
        biography,
        description,
        service: {
          category: service.category,
          subcategories: subcategoryIds,
        },
        photo,
        location,
        surrounding,
        userId: user._id,
      });
  
      await newPrestataire.save();

      user.prestataireId = newPrestataire._id;

      await user.save();
  
      res.status(201).json({
        message :"Vous avez crée votre profil avec succès",
        prestataireId: newPrestataire._id
      
      })
        
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  
  

module.exports = {createPrestataire, deletePrestataire, updatePrestataire, getPrestataire, getPrestataires}
  