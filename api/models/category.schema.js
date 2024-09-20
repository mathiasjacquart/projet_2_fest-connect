const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    nameSubCategory: { type: String, required: true},
    urlSubCategory: { type: String, required: true},
    keywords :  [{type: String}]
})

const categorySchema = new mongoose.Schema( 
    { 
        nameCategory: { type: String, required: true},
        urlCategory: { type: String, required: true},
        subCategories: [subCategorySchema],
        prestataireIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }]
    }
);



module.exports = mongoose.model("Category", categorySchema);
