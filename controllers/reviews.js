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

//@desc     Create Reviews
//@route    POST Api '/api/v1/bootcamp/:bootcampId/reviews'
//@acess    private
exports.addReview = asyncHandler(async (req, res, next) => {

    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id ${req.params.bootcampId}`, 400));
    }

    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review
    });

});

//@desc     Update Reviews
//@route    Put Api '/api/v1/reviews/:reviewid'
//@acess    private
exports.updateReview = asyncHandler(async (req, res, next) => {
     let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No bootcamp with id ${req.params.id}`, 400));
    }

    // Make sure the review belong to user or admin

    if (review.user.toString() !== review.user.id && review.user.role !== "admin") {
        if (!review) {
            return next(new ErrorResponse(`Not authorised to update bootcamp`, 401));
        }
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: review
    });

});

//@desc     Delete Reviews
//@route    Delete Api '/api/v1/reviews/:reviewId'
//@acess    private
exports.deleteReview = asyncHandler(async (req, res, next) => {
     const review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No bootcamp with id ${req.params.id}`, 400));
    }

    // Make sure the review belong to user or admin

    if (review.user.toString() !== review.user.id && review.user.role !== "admin") {
        if (!review) {
            return next(new ErrorResponse(`Not authorised to update bootcamp`, 401));
        }
    }

    await review.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });

});

