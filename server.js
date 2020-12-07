const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/apiSearch");
const auth = require("./routes/auth");

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
}

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

// connect database
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/weather_map", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Connected to Mongo Database: weather_map");
    },
    (err) => {
      console.log("Error connecting to Database: ", err);
    }
  );

//mongoose promise is depricated, we overide it with nodes's promise
mongoose.Promise = global.Promise;

// connect to routes
app.use("/api", routes);
app.use("/auth", auth);

//Start the api server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
