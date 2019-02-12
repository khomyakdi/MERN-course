const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error));

app.get('/', (req,res) => res.send('Hello'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serer running on port ${PORT}`));