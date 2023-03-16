const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017";

const connectToMongo = async() => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to mongo")
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectToMongo;
