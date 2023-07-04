const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { forecast } = require("./utils/utils");

const app = express();

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Khan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Khan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "This is a help text",
    name: "Khan",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }
  forecast(req.query.address, (error, {forecast, location}) => {
    if (error) {
      return res.send({
        error,
      });
    } else {
      res.send({ forecast, location, address: req.query.address });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error page",
    name: "Khan",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "A Error page",
    name: "Khan",
    error: "An error has occured",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
