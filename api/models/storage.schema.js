const mongoose = require("mongoose");


const storageSchema = new mongoose.Schema( 
    {
        Url : {
            type:String,
            required:true
        },
        title : { 
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Storage" , storageSchema)
