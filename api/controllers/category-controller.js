const Category = require("../models/category.schema")

// Get all categories
const getCategories = async (req, res) => {
    console.log(req.body);
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get single category by ID
  const getCategory = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update category by ID
  const updateCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete category by ID
  const deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createCategory = async (req, res) => { 
    try {
      const { nameCategory, urlCategory, subCategories, prestataireId } = req.body;
      const category = new Category({
        nameCategory,
        urlCategory,
        subCategories,
        prestataireId
      });
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {createCategory, deleteCategory, updateCategory, getCategory, getCategories}
  