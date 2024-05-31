const express = require('express');
require('dotenv').config(); // Add this line at the top
const myRouter = require('./routes/myRouter')
const path = require('path');
const cookieSession = require('cookie-session');

const app = express();
app.use(express.urlencoded({extended:false}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// SET OUR VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  24 * 60 * 60 * 1000 // 24hr
}));
// Middleware to set login status
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
});









// Use the router from routes/myRouter.js
app.use('/', myRouter);

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});