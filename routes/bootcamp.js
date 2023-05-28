const express = require('express');
const {
    createBootcamp,
    deleteBootcamp,
    getBootcamp,
    getSingleBootcamp,
    updateBootcamp,
    getBootcampInRadius
} = require('../controllers/bootcamp');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(
    getBootcampInRadius
);

router.route('/')
    .get(getBootcamp)
    .post(createBootcamp);

router.route('/:id')
    .put(updateBootcamp)
    .get(getSingleBootcamp)
    .delete(deleteBootcamp);

module.exports = router;