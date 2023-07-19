

const comic = require('./comic.route');


function route(app) {
    app.get('/', (req, res) => {
        res.send('Hey this is my API running 🥳')
    })
    app.use('/comic', comic);

}

module.exports = route;