const express = require("express") ;
const users = require("./MOCK_DATA.json");

const app = express ;
const PORT = 6000 ;
//routes

app.listen(PORT , () => console.log(`Server Started on port ${PORT}`));