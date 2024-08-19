const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
    {
        firstname: {type:String, required: true},
        surname: {type:String, required: true},
        email: {type:String, required: true},
        message: {type:String, required: true},
    },
    {
        timestamps:true,
    }
);
//Conversion _id en id 
contactSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
module.exports = mongoose.model("Contact", contactSchema);