const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const Bootcamp = require('../models/Lmsmodel');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc     Get Reviews
//@route    Get Api '/api/v1/reviews'
//@route    Get Api '/api/v1/bootcamp/:bootcampId/reviews'
//@acess    public
exports.getReviews = asyncHandler(async (req, res, next) => {

    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        res.status(200).json(res.advancedResult);
    }
});
