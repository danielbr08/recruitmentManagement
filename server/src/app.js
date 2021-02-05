const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const compression = require('compression');

const indexRouter = require('./routes/index');
const recruitmentRouter = require('./routes/recruitment');

const app = express();
app.use(cors());
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(compression()); //Compress all routes
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/recruitment', recruitmentRouter);

app.use( (err, req, res, next) => {
    res.status(err.status || 500)
    console.error(err)
    return res.send(err.message)
})

module.exports = app;