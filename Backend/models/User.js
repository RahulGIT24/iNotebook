const mongoose = require('mongoose'); // Importing mongoose
const { Schema } = mongoose;

// Defining user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User; // Exporting UserSchema as user, a mongoose model