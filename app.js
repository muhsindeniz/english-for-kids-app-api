const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const modules = require('./routes/modules');
const questions = require('./routes/questions');

require('dotenv/config')

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static('uploads'))
app.use('/api', modules, questions);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to mongoDB")
})

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
})

app.listen(process.env.PORT)