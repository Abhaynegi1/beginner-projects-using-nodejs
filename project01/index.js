const express = require("express");  //importing express
const {connectMongoDB} = require("./connection");  //making a module for stabling a connection between server and data base
const userRoutes = require("./routes/user");  //making a module to surf through all the routes mostly in this case user routes 
const {logReqRes} = require("./middlewares");  //making a module for the middle the middleware

const app = express();  //setting up express so that it can be used to declare routes
const PORT = 8000;

//Connection
//mongodb://127.0.0.1:27017 : denotes the server as for now it is in local server project01 : denontes the name of the database
connectMongoDB("mongodb://127.0.0.1:27017/project01").then(() => console.log("MongoDB connection successfull"));


app.use(express.urlencoded({ extended: false })); // Middleware Plugin

app.use(express.json()); // To parse JSON data from the body

app.use(logReqRes("log.txt"));  //giving of the file to the middleware


//Routes
app.use("/api/users" , userRoutes);  //calling the userRoutes to handle all the routes related to Users

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
