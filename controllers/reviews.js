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
    // console.log(req.params.bootcampId);

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


//@desc     Get Reviews
//@route    Get Api '/api/v1/reviews'
//@route    Get Api '/api/v1/bootcamp/:bootcampId/reviews'
//@acess    public
exports.getReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!review) {
        return next(new ErrorResponse("No review found", 404));
        
    }

    res.status(200).json({
        success: true,
        data: review
    });

});