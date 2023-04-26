const mongoose = require("mongoose"); // Impoting mongoose
const connect = require('./config')

const mongoURI = connect; // iNotebook database URL

// Connecting to databse
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo; // Exporting connectToMongo function
