const mongoose = require('express');

const reviewSchema = new mongoose.Schema( 
    { 
        title: {type:String, required:true},
        content: { type:String, required:true},
        note: {type:Number, required:true},
        clientId: { type: mongoose.Schema.Types.ObjectId, ref:'Client'},
    },
    {timestamps:true}

);

reviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Review", reviewSchema);