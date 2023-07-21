const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Comment = new mongoose.Schema({
    fullname: { type: String, require: true },
    content: { type: String, require: true },
    id_comic: { type: String, require: true, },
    id_user: { type: String, require: true },
}, {
    collection: "comments"
});

module.exports = mongoose.model('Comment', Comment);