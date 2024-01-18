//require dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controller');
const sequelize = require('./config/connection');

//setup express app
const app = express();
const PORT = process.env.PORT || 3001;

//create handlebars engine object
const hbs = exphbs.create({});

//sets up handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware to parse JSON and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));