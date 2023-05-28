const errorHandler = require('../middleware/error');
const ErrorResponse = require('../utils/errorResponse');
const geoCode = require('../utils/geocoder');
const LMS = require('../models/Lmsmodel');
const asyncHandler = require('../middleware/async');

//@desc     Get All bootcamp
//@route    Get Api '/api/v1/bootcamp'
//@acess    public
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const data = await LMS.find();
    res.status(200).json({
        success: true,
        count: data.length,
        data: data,
    });

});

//@desc     Get single bootcamp
//@route    Get Api '/api/v1/bootcamp/:id'
//@acess    public
exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {

    const lms = await LMS.findById(req.params.id)
    if (!lms) {
        return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: lms
    });
});

//@desc     Create new bootcamp
//@route    POST Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // console.log(req.body);

    const lms = await LMS.create(req.body);
    res.status(201).json({
        success: true,
        data: lms
    });

});

//@desc     Update bootcamp
//@route    PUT Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const lms = await LMS.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!lms) {
        return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));

    }
    res.status(200).json({ success: true, data: lms });

});

//@desc     Delete bootcamp
//@route    Delete Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const lms = await LMS.findByIdAndDelete(req.params.id);
    if (!lms) {
        return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: {}
    })

});

//@desc     Get bootcamp Within a radius
//@route    GET Api '/api/v1/bootcamp/radius/:zipcode/:distance'
//@acess    Private
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat and long from GEO Coder
    const loc = await geoCode.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calculate the radius using radians

    // Divide distance by radius of earth
    // Earth radius = 3963 mi/ 6378 km

    const radius = distance / 3963;

    const bootcamp = await LMS.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ]
            }
        }

    });
   
    res.status(200).json({
        success: true,
        count: bootcamp.length,
        data: bootcamp
    })

});