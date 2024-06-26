const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstname: {type:String, required: true},
        surname: {type:String, required: true},
        username: {type:String, required: true},
        email: {type:String, required: true},
        password: {type:String, required: true},
        role: {type:String, default: 'user'},
        token:String,
    },
    {
        timestamps:true,
    }
);
//Conversion _id en id 
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
module.exports = mongoose.model("User", userSchema);