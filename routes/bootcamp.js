const express = require('express');
const {
    createBootcamp,
    deleteBootcamp,
    getBootcamp,
    getSingleBootcamp,
    updateBootcamp,
    getBootcampInRadius,
    bootcampPhotUpload
} = require('../controllers/bootcamp');

// Include other resources router
const courseRouter = require('./courses');

const router = express.Router();

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);


router.route('/radius/:zipcode/:distance').get(
    getBootcampInRadius
);

router.route('/:id/photo').put(bootcampPhotUpload);

router.route('/')
    .get(getBootcamp)
    .post(createBootcamp);

router.route('/:id')
    .put(updateBootcamp)
    .get(getSingleBootcamp)
    .delete(deleteBootcamp);

module.exports = router;