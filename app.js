var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser")
var logger = require('morgan');
require("dotenv/config");
var cors = require("cors");
var routes = require("./routes");
var models = require("./models");
var sequelize = require("./config/dbconfig")
var pwLib = require("./libs/password-hash-lib")

var app = express();

const eraseDatabaseOnStart = true

const PORT = process.env.PORT || process.env.SERVER_PORT;

//CORS and Body Parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set view to HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// logger and other things
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'routes/public')));

// routes
app.use("/api/user", routes.user);
app.use("/", routes.public);


// Sync and Seed
sequelize.sync({ force: eraseDatabaseOnStart }).then(async () => {
  if (eraseDatabaseOnStart) {
    seedDatabase();
  }

  // App Listening
  app.listen(PORT, () =>
    console.log(`***** Text-to-thought API listening on port ${PORT}! *****`)
  );
});

// Seed Database Function
const seedDatabase = async () => {
  const seed = 5;

  const hashedPassword = pwLib.generateHashPassword("Passw0rd!" + seed);

  console.log(seed);
  console.log("******  " + hashedPassword + "  ******");

  await models.User.create(
    {
      email: "1trankev@gmail.com",
      hashedPassword: hashedPassword,
      isVerified: true,
      Name: "Kevin",
      seed: seed,
      isActive: true,
      message: [
        {
          msg: "Hi there",
          createdAt: Date.now()
        },
        {
          msg: "This is a message",
          createdAt: Date.now()
        },
        {
          msg: "Another message",
          createdAt: Date.now()
        },
        {
          msg: "This is another message",
          createdAt: Date.now()
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
}


module.exports = app;
