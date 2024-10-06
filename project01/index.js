const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;


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

app.get("/users", (req, res) => {
    const html = `
    <ul>
     ${users.map((user) => `<li> ${user.first_name} </li>`).join(" ")}
    </ul>
    `;
    return res.send(html);
});

app.get("/api/users", (req, res) => {
    //http headers are the key-value pairs that provide additional information about the request or response
    res.setHeader("X-myName" , "Abhay"); // making a custom header 
    return res.json(users);
});

app
    .route("/api/users/:id") // :id is a dynamic path parameter
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    })
    .put((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user data
        const updatedUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;

        // Write the updated data back to the file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error updating user" });
            }
            return res.json({ message: "User updated successfully", updatedUser });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the user from the array
        users.splice(userIndex, 1);

        // Write the updated data back to the file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error deleting user" });
            }
            return res.json({ message: "User deleted successfully" });
        });
    });

// Post route to add a new user
app.post("/api/user", (req, res) => {
    const body = req.body;
    const newUser = { id: users.length + 1, ...body };

    // Push the new user to the users array
    users.push(newUser);

    // Write the updated data back to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving user" });
        }
        return res.json({ status: "Success", id: users.length });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
