const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema( 
    { 
        title: {type:String, required:true},
        content: { type:String, required:true},
        note: {type:Number, required:true},
        userId: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
        prestataireId:  { type: mongoose.Schema.Types.ObjectId, ref:'Providers'}
    },
    {timestamps:true}

);

reviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Review", reviewSchema);