const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

SECRET = process.env.SECRET||'qwerty';

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser(SECRET));
app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

app.get('/', (req, res, err) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/clubs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clubs.html'));
});

app.get('/set-classes', (req, res) => {
    req.session.test = 'abcd';
    res.send('Test');
});

app.get('/get-classes', (req, res) => {
    let test = req.session.test;
    console.log(test);
});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server started on port 3000'));