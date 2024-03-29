//require dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

const routes = require('./controllers');
const sequelize = require('./config/connection');

//setup express app
const app = express();
const PORT = process.env.PORT || 3001;

//sets up sessions with cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // Stored in milliseconds
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

//create handlebars engine object
const hbs = exphbs.create({ helpers });

//sets up handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware to parse JSON and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//start server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(
            `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
        )
    );
});