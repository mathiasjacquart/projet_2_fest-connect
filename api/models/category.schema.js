const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true},
    urlSubCategory: { type: String, required: true},
    keywords :  [{type: String}]
})

const categorySchema = new mongoose.Schema( 
    { 
        name: { type: String, required: true},
        urlCategory: { type: String, required: true},
        subCategories: [subCategorySchema],
        prestataireId: { type: mongoose.Schema.Types.ObjectId, ref:'Provider'}
    }
);



module.exports = mongoose.model("Category", categorySchema);
