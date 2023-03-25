const mongoose = require("mongoose"); // Impoting mongoose

const mongoURI = "mongodb://localhost:27017/iNotebook"; // iNotebook database URL

// Connecting to databse
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo; // Exporting connectToMongo function
