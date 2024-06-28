const Review  = require("../models/review.schema")

// Get all reviews
const getReviews = async (req, res) => {
    console.log(req.body);
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get single review by ID
  const getReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update review by ID
  const updateReview = async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete review by ID
  const deleteReview = async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createReview = async (req, res) => { 
    try {
      const review = new Review (req.body) 
      await review.save();
      res.status(200).json(review)
    } catch (error) {
      res.status(500).json ({ error : error.message})
    }
  }


module.exports = {createReview, deleteReview, updateReview, getReview, getReviews}
  