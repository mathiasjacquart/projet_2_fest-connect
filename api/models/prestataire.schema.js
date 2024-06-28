const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema(
    {
        businessname: {type:String, required: true},
        photo: {type:String, required: true},
        service:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        biography: {type:String, required: true},
        description: {type:String, required: true},
        location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required:true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        socials: {type:String, required: true},
    },
    {
        timestamps:true,
    }
);
//Conversion _id en id 
 providerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
module.exports = mongoose.model("Provider", providerSchema);