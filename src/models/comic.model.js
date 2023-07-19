const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Comic = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    author: { type: String, require: true },
    year: { type: Number, require: true },
    avatar: { type: String, require: true },
    image: { type: [String] },
}, {
    collection: "comics"
});

module.exports = mongoose.model('Comic', Comic);