const express = require("express");
const dotenv = require("dotenv");
// const logger = require("./middleware/logger");
const colors = require('colors');
const morgan = require("morgan");
const connectDb = require("./config/db")


// Load env Variables
dotenv.config({
    path: "./config/config.env"
});
connectDb();

// Route file
const bootcamp = require('./routes/bootcamp');
const app = express();

// Mount router


// app.use(logger);
// Dev Logging Environment
if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'));
    
}

app.use('/api/v1/bootcamp', bootcamp);



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