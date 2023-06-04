const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
// const logger = require("./middleware/logger");
const morgan = require("morgan");
const colors = require('colors');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require("./middleware/error");
const cookieParser = require('cookie-parser');


const connectDb = require("./config/db")


// Load env Variables
dotenv.config({
    path: "./config/config.env"
});
connectDb();

// Route file
const bootcamp = require('./routes/bootcamp');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/user');
const reviews = require('./routes/reviews');
const app = express();

// Body Parser
app.use(express.json());


// Cookie Parser
app.use(cookieParser());


// app.use(logger);
// Dev Logging Environment
if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'));
    
}

// File Upload
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security header
app.use(helmet());

// Prevent XSS attaack
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100

});

app.use(limiter);


// Hpp http param polution 

app.use(hpp());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Mount routers
app.use('/api/v1/bootcamp', bootcamp);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;



const server = app.listen(
    PORT, console.log(`Server running in ${process.env.PORT} mode on PORT ${PORT} `.yellow.bold)
)
// export express;

//Handle unhandle promise rejection
process.on('unhandledRejection', (err, Promise) => { 
    console.log(`${err.message}`);
    // close server and exit the process
    server.close(
        () => process.exit(1)
    );
});