const express = require("express");
const path = require("path");
const urlRoutes = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const PORT = 8001;
const app = express();

app.use("/url", urlRoutes);
app.use(express.json());
app.get("/url/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
            timestamp : Date.now(),
        }
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.get("/test" , async (req ,res) =>{
    const allUrls = await URL.find({});
    return res.render("home" , {
      urls : allUrls,
    });
})

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
