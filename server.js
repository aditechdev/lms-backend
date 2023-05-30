const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
// const logger = require("./middleware/logger");
const colors = require('colors');
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const fileUpload = require('express-fileupload');
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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Mount routers
app.use('/api/v1/bootcamp', bootcamp);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
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