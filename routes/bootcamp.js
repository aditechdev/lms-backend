const express = require('express');
const {
    createBootcamp,
    deleteBootcamp,
    getBootcamp,
    getSingleBootcamp,
    updateBootcamp
} = require('../controllers/bootcamp');

const router = express.Router();


router.route('/')
    .get(getBootcamp)
    .post(createBootcamp);

router.route('/:id')
    .put(updateBootcamp)
    .get(getSingleBootcamp)
    .delete(deleteBootcamp);

module.exports = router;