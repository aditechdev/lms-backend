const express = require("express");
const dotenv = require("dotenv");
// const logger = require("./middleware/logger");
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



app.listen(
    PORT, console.log(`Server running in ${process.env.PORT} mode on PORT ${PORT} `)
)
// export express;