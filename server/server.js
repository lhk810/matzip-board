const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');

app.get('/',(req,res) => {
    res.send('server on');
})

app.listen(PORT, () => {
    console.log('listen~');
})