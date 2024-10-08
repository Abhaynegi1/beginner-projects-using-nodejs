const fs = require("fs");

function logReqRes(filename){
    return (req , res ,next) =>{ //Made a middleware the req and res will remain same for all the middle ware and main function so it can be used in "api/users" in future. and next(); is important to call otherwise the middleware will keep the request to it self  
        console.log("Hello from middleware");
        const logEntry = `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.url}`;  //as logEntry is made in this middleware it can be used troughtout all the middleware it call next(); and the main function
    
        fs.appendFile(filename, logEntry, (err , date) => {});
    
        next(); //to call the next middleware in this case Routes as there are no more middleware
    };
}

//In this case we are using middleware just to see the details about the user ip method url and appending it on log.txt file 

module.exports = {
    logReqRes,
}