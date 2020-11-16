const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/api');

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

// connect database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/weather_map", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log("Connected to Mongo Database: weather_map")
    }, (err) => {
        console.log("Error connecting to Database: ", err)
    });

//mongoose promise is depricated, we overide it with nodes's promise
mongoose.Promise = global.Promise; 

// connect to routes
app.use('/api', routes);

//Start the api server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});