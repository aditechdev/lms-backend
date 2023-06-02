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

const LMS = require('../models/Lmsmodel');

// Include other resources router
const courseRouter = require('./courses');

const advancedResult = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);


router.route('/radius/:zipcode/:distance').get(
    getBootcampInRadius
);

router.route('/:id/photo').put(protect, authorize('admin', 'publisher'), bootcampPhotUpload);

router.route('/')
    .get(advancedResult(LMS, 'courses'), getBootcamp)
    .post(protect, createBootcamp);

router.route('/:id')
    .put(protect, authorize('admin', 'publisher'),updateBootcamp)
    .get(getSingleBootcamp)
    .delete(protect, authorize('admin', 'publisher'),deleteBootcamp);

module.exports = router;