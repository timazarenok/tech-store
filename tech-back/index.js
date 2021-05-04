const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const orders = require("./routes/api/orders");
const products = require("./routes/api/products");

var { sequelize } = require("./models/index");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  password: '0',
  database: 'tech'
});


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api", orders);
app.use("/api/products", products)

const port = process.env.PORT || 3000;

sequelize.sync({ force: true }).then( () => (
  app.listen(port, () => console.log(`Server up and running on port ${port} !`))
))
