const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.get('/', (req, res, err) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/clubs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clubs.html'));
});



PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server started on port 3000'));