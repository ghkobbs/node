const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const courses = require('./routes/courses');
const index = require('./routes/index');
const logger = require("./middleware/logger");
const express = require('express');
const app = express();

app.set('view engine', 'pug'); // set to return html markup to client
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//set key=value pair
app.use(express.static('public')); // Allow to serve static files
app.use(helmet()); // Helps secure your apps by setting various HTTP headers.
app.use('/api/courses', courses);
app.use('/', index);

// Configuration
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
console.log('Mail Password:' + config.get('mail.password'));

//Check if code is running on development machine
if(app.get('env') === 'development'){
    app.use(morgan('tiny')); //HTTP request logger.
    startupDebugger('Morgan is enabled...');
}

app.use(logger);

// set environment port
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on PORT ${port}....`)
})