const express = require("express");

// const users = require("./MOCK_DATA.json");  now we will be using mongoDB for this 

const fs = require("fs");
const mongoose = require("mongoose");  //library to connect to data base
const app = express();
const PORT = 8000;

//Connection
//mongodb://127.0.0.1:27017 : denotes the server as for now it is in local server project01 : denontes the name of the database
mongoose.connect("mongodb://127.0.0.1:27017/project01")
.then(() =>console.log("MongoDB connected"))
.catch(err => console.log("Not connected" , err)) ;

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

//connecting the model 
const User = mongoose.model("user" , userSchema);


app.use(express.urlencoded({ extended: false })); // Middleware Plugin

app.use(express.json()); // To parse JSON data from the body

app.use((req, res, next) => {  //Made a middleware the req and res will remain same for all the middle ware and main function so it can be used in "api/users" in future. and next(); is important to call otherwise the middleware will keep the request to it self  
    console.log("Hello from middleware");
    const logEntry = `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.url}`;  //as logEntry is made in this middleware it can be used troughtout all the middleware it call next(); and the main function

    fs.appendFile("log.txt", logEntry, (err , date) => {});

    next(); //to call the next middleware in this case Routes as there are no more middleware
});

// Routes
app.get("/", (req, res) => {
    return res.send("This is the homepage");
});

app.get("/users", async(req, res) => {
    const allDBUsers = await User.find({}) ;  //using the query find to get all the users in the DB {}
    const html = `
    <ul>
     ${allDBUsers.map((user) => `<li> ${user.firstName} - ${user.email} </li>`).join(" ")} 
    </ul>
    `; 
    return res.send(html);
});

app.get("/api/users", async(req, res) => {
    const allDBUsers = await User.find({}) ;
    //http headers are the key-value pairs that provide additional information about the request or response
    // res.setHeader("X-myName" , "Abhay"); // making a custom header 
    return res.json(allDBUsers);
});

app
    .route("/api/users/:id") // :id is a dynamic path parameter
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    })
    .patch(async (req, res) => {
       await User.findByIdAndUpdate(req.params.id , {lastName : "Khan"});
       return res.json({status : "success"}) ;
    })
    .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "success"});
    });

// Post route to add a new user
app.post("/api/user", async(req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ message: "All fields are required" });  //bad request 
    }
    const result = await User.create({  // to create new user {this time we have removed the fs function to write in the json file }
        firstName : body.first_name , 
        lastName : body.last_name ,
        email : body.email ,
        gender : body.gender ,
        jobTitle : body.job_title ,
    })
    console.log("Result : ", result);
    return res.status(201).json({message : "Successfull"});
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
