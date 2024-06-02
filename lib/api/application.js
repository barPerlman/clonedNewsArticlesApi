'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./routers/apiRouter');
const cors = require('cors');
const app = express();

const corsOptions ={
    origin:'http://localhost:80',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', apiRouter);

module.exports = app;



