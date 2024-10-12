const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true, 
        unique : true ,
    },
    redirectURL: {
        type: String,
        required: true,  
    },
    redirectID: {
        type: String,
        required: false,  
    },
    visitHistory: [{timestamp : {type : Number}}],
}, {timestamps : true});

const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
