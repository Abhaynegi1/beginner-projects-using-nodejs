const mongoose = require("mongoose");  //library to connect to data base

mongoose.set("strictQuery" , true); // idk why I did this the terminal was giving me the warning so I added this line 

async function connectMongoDB(url){
    //Connection
//mongodb://127.0.0.1:27017 : denotes the server as for now it is in local server project01 : denontes the name of the database
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB,
};