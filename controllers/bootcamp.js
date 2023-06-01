const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const geoCode = require('../utils/geocoder');
const LMS = require('../models/Lmsmodel');
const asyncHandler = require('../middleware/async');

//@desc     Get All bootcamp
//@route    Get Api '/api/v1/bootcamp'
//@acess    public
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResult);

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
    // Add User to req,body
    req.body.user = req.user.id;

    //Check for publish bootcamp
    const publishBootcamp = await LMS.findOne({ user: req.user.id });

    // If the user is not an admin, they can only add one bootcamp
    if (publishBootcamp && req.user.role !== 'admin') {

        return next(new ErrorResponse(`User with Id ${req.user.id} has already published a bootcamp`, 400))

    }


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

    const lms = await LMS.findById(req.params.id);
    if (!lms) {
        return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));
    }

    // await lms.remove();
    // await lms.remove(

    // );
    // await LMS.deleteOne();
    // lms.remove();
    await lms.deleteOne();
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


//@desc     Upload Photo for  bootcamp
//@route    PUT Api '/api/v1/bootcamp/:id/photo'
//@acess    Private
exports.bootcampPhotUpload = asyncHandler(async (req, res, next) => {

    const lms = await LMS.findById(req.params.id);
    if (!lms) {
        return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload file`, 400));
    }
    const files = req.files.file;

    // Make sure the image is photo
    if (!files.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    //Check File Size
    if (!files.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    files.name = `photo_${lms._id}${path.parse(files.name).ext}`;
    files.mv(`${process.env.FILE_UPLOAD_PATH}/${files.name}`, async err => {

        if (err) {
            console.error(err);
            return next(new ErrorResponse(`PROBLEM WITH FILE UPLOAD`, 500));


        }
        await LMS.findByIdAndUpdate(req.params.id, {
            photo: files.name
        });
        return res.status(200).json({
            success: true,
            data: files.name
        });
    });
    // console.log(files.name);
});