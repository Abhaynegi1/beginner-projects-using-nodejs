const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUserById,
} = require("../controller/user"); //defined these modules in the controller folder for better sturcture
const router = express.Router(); //making a router variable here . AS using app router is not suggested in other modules other than the index file.

// Routes

// router.get("/users", async(req, res) => {
//     const allDBUsers = await User.find({}) ;  //using the query find to get all the users in the DB {}
//     const html = `
//     <ul>
//      ${allDBUsers.map((user) => `<li> ${user.firstName} - ${user.email} </li>`).join(" ")}
//     </ul>
//     `;
//     return res.send(html);
// });

//work of the function can be identified by the name of the function
router.route("/").get(handleGetAllUsers).post(handleCreateNewUserById);

router
  .route("/:id") // :id is a dynamic path parameter
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
