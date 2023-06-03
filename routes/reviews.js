const express = require('express');

const {
    getReviews
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResult = require('../middleware/advancedResult');

const { protect, authorize } = require('../middleware/auth');


router.route('/').get(advancedResult(Review, {
    path: 'bootcamp',
    select: 'name description'
}), getReviews);
// router.route('/:id').get(getCourse).put(protect, authorize('admin', 'publisher'), updateCourse).delete(protect, authorize('admin', 'publisher'), deleteCourse);

module.exports = router;