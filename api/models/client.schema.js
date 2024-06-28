const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
    {
        businessname: {type:String, required: true},
        photo: {type:String, required: false },
        review : {type: mongoose.Schema.Types.ObjectId, ref: "Review" , required:true},
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required:true },
        biography: {type:String, required: false },
        description: {type:String, required: false },
    },
    {
        timestamps:true,
    }
);
//Conversion _id en id 
clientSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
module.exports = mongoose.model("Client", clientSchema);