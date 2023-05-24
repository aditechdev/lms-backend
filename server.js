const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

// Route file
const bootcamp = require('./routes/bootcamp');

// Load env Variables
dotenv.config({
    path: "./config/config.env"
});

const app = express();

// Mount router


app.use(logger);

app.use('/api/v1/bootcamp', bootcamp);



const PORT = process.env.PORT || 5000;



app.listen(
    PORT, console.log(`Server running in ${process.env.PORT} mode on PORT ${PORT} `)
)
// export express;