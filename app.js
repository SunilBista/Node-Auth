const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const appRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

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
app.use(appRoutes);
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Home");
  res.render("home");
});

app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isEmployee", false, { maxAge: 100000 });
  res.send("you got the cookies");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});
