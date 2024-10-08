const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const appRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkAuth, checkUser } = require("./middleware/authMiddleware");
dbConnect()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("Failed to connect to database", error);
  });
app.use(express.json()); //parse JSON to javascript object
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.get("*", checkUser);

app.use(appRoutes);

app.get("/", checkAuth, (req, res) => {
  res.render("home");
});

app.get("/content", checkAuth, (req, res) => {
  res.render("content");
});
