const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/clubs', (req, res) => {

});

app.listen(3000, () => console.log('Server started on port 3000'));