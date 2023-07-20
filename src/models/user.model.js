const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const User = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    fullname: { type: String, require: true },
    email: { type: String, require: true },
}, {
    collection: "users"
});

module.exports = mongoose.model('User', User);