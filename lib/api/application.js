'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./routers/apiRouter');
const cors = require('cors');
const app = express();

// support requests from localhost variations
// port 80 for containerized client and 3000 for local react dev server with default port
const allowedOrigins = [
    'http://localhost',
    'http://localhost:80',
    'http://127.0.0.1',
    'http://127.0.0.1:80',
    'http://localhost:3000'
];

const corsOptions ={
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', apiRouter);

module.exports = app;



