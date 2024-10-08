const User = require("../models/user");

//in this module we are basically defining all the function that we are calling in the routes modules

async function handleGetAllUsers(req, res) {
  //will show all the users in key-value pair
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
  //to get the k-v pair about a specific user
  const user = await User.findById(req.params.id); //findById is a predefined MongoDB method
  if (!user) {
    return res.status(404).json({ message: "User not found" }); //returning the status if the user is not found in the database
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  //to update a user. called by the .patch request
  await User.findByIdAndUpdate(req.params.id, { lastName: "Khan" }); //here we are just updating the last name of the user in real life senario we will do this dynamically
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleCreateNewUserById(req, res) {
  //will create a new user by getting the values from the form . for now we are using form of POSTMAN
  const body = req.body; //getting the values from the body
  if (
    //checking if the all the details are filled or not
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are required" }); //bad request
  }
  const result = await User.create({
    // to create new user {this time we have removed the fs function to write in the json file }
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("Result : ", result);
  return res.status(201).json({ message: "Successfull", id: result._id });
}

module.exports = {
  //exporting all the function so that it can be used in the routes modules
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUserById,
};
