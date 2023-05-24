const express = require("express");
const dotenv = require("dotenv");

// Load env Variables
dotenv.config({
    path: "./config/config.env"
});

const app = express();

app.get('/api/v1/bootcamp', (req, res) => { 
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: "Show all bootcamp"
    });
});
app.post('/api/v1/bootcamp', (req, res) => { 
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: "Create new bootcamp"
    });
});
app.put('/api/v1/bootcamp/:id', (req, res) => { 
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`
    });
});
app.get('/api/v1/bootcamp/:id', (req, res) => { 
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: `Get bootcamp ${req.params.id}`
    });
});
app.delete('/api/v1/bootcamp/:id', (req, res) => { 
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    });
});

const PORT = process.env.PORT || 5000;



app.listen(
    PORT, console.log(`Server running in ${process.env.PORT} mode on PORT ${PORT} `)
)
// export express;