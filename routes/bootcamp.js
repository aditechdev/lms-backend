const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: "Show all bootcamp"
    });
});
router.post('/', (req, res) => {
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: "Create new bootcamp"
    });
});
router.put('/:id', (req, res) => {
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`
    });
});
router.get('/:id', (req, res) => {
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: `Get bootcamp ${req.params.id}`
    });
});
router.delete('/:id', (req, res) => {
    // res.send("<h1>HELLO form Express</h1>");
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    });
});

module.exports = router;