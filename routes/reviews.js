const express = require('express');

const {
    getReviews, getReview
} = require('../controllers/reviews');

const router = express.Router({ mergeParams: true });

const Review = require('../models/Review');


const advancedResult = require('../middleware/advancedResult');

const { protect, authorize } = require('../middleware/auth');


router.route('/').get(advancedResult(Review, {
    path: 'bootcamp',
    select: 'name description'
}), getReviews);

router.route('/:id').get(getReview);

module.exports = router;