// const users = require("./MOCK_DATA.json");  now we will be using mongoDB for this 
const mongoose = require("mongoose");  //library to connect to data base


//Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required : true ,  //should be filled by the user 
    },
    lastName : {
        type : String ,
        required : false ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,  //should be unique in the data base
    },
    jobTitle : {
        type : String ,
    },
    gender : {
        type : String ,
    }
},{timestamps : true});

const User = mongoose.model("user" , userSchema);

module.exports = User ;