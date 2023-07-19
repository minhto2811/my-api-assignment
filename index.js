const express = require('express');
const expressHbs = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const db = require('./src/configs/db');

const route = require('./src/routes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.engine('hbs', expressHbs.engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, './src/views/layouts'),
    partialsDir: "./src/views/partials",
    defaultLayout: "main",
    helpers: {
    
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './src/views'));

db.connect();
route(app);





app.listen(PORT, () => {
    console.log("path:", path.join(__dirname, './src/public'));
    console.log(`Server is running at http://localhost:${PORT}/comic/home`);
})









