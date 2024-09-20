const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    region:{ type: String, required:true},
    city: { type: String, required: true },   
    postalCode: { type: String, required: true },
    
});

module.exports = mongoose.model("Location", locationSchema);