const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/clubs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clubs.html'));
});

app.listen(3000, () => console.log('Server started on port 3000'));