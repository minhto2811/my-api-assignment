
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

class ApiController {
    addNew(req, res) {
        const data = req.body;
        data.password = jwt.sign(data.password, SECRET);
        User.create(data).then((rs) => res.json(rs)).catch((err) => res.json(err));
    }

    login(req, res) {
        const username = req.body.username;
        const password = jwt.sign(req.body.password, SECRET);
        User.findOne({ username: username, password: password })
            .then((user) => {
                res.json(user);
            }).catch((err) => res.json(err));
    }
    loginAuto(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({ username: username, password: password })
            .then((user) => {
                res.json(user);
            }).catch((err) => res.json(err));
    }
}





module.exports = new ApiController;