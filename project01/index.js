const express = require("express") ;
const users = require("./MOCK_DATA.json");

const app = express() ;
const PORT = 8000 ;
//routes
app.get("/" , (req , res) =>{
    return res.send("This is the homepage");
})

app.get("/users" , (req ,res) =>{
    const html = `
    <ul>
     ${users.map((user) => `<li> ${user.first_name} </li>`).join(" ")}
    </ul>
    `;
    return res.send(html) ;
})

app.get("/api/users" , (req ,res) =>{
    return res.json(users) ; 
})

app
    .route("/api/users/:id") // :id is a dynamic path parameter 
    .get((req , res) => {  
    const id = Number(req.params.id) ;
    const user = users.find((user) => user.id === parseInt(id)) ;
    return res.json(user) ;
    })
    .put((req , res) => {
        //Edit user with id
        res.json({status : "Pending"});
    })
    .delete((req , res) => {
        //Delete user with id
        res.json({status : "Pending"});
    });


app.listen(PORT , () => console.log(`Server Started on port ${PORT}`));