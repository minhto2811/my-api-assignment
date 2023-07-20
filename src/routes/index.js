

const comic = require('./comic.route');
const user = require('./user.route');



function route(app) {
    app.get('/', (req, res) => {
        res.send('Hey this is my API running 🥳')
    })
    app.use('/comic', comic);
    app.use('/user', user);

}

module.exports = route;