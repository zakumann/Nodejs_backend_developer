const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Router
app.get("/", (req, res) => {
    res.render("home", { title: "Test Forum", message: "Good to see you." });
});

app.get("/write", (req, res) => {
    res.render("write", { title: "Test forum" });
});

app.listen(3000);