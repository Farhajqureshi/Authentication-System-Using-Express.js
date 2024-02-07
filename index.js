const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.json());

const connectDb = require('./config/database')
connectDb();

// middleware use

const user = require('./routes/Auth.routes');

app.use('/api/v1', user);

app.get('/', function (req, res) {
    res.send(`This is a home page`)
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});

