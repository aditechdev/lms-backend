const ErrorResponse = require('../utils/errorResponse');
const geoCode = require('../utils/geocoder');
const LMS = require('../models/Lmsmodel');
const asyncHandler = require('../middleware/async');

//@desc     Get All bootcamp
//@route    Get Api '/api/v1/bootcamp'
//@acess    public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    // console.log(req.query);
    let query;
    // Copy request query
    const reqQuery = { ...req.query };

    // Field to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over remove field and delete them for req querry
    removeFields.forEach(param => delete reqQuery[param])

    // console.log(reqQuery);

    // Creat query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    // console.log(queryStr);
    // Find resource
    query = LMS.find(JSON.parse(queryStr)).populate('courses');
    
    // SELECT FIELD
    if (req.query.select) {
        const fields = req.query.select.split(',').join( ' ');
        console.log(fields);
        query.select(fields);
        
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split('.').join(' ');
        query = query.sort(sortBy)
    } else { 
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await LMS.countDocuments();

    query = query.skip(startIndex).limit(limit);

    
    // executing query
    const data = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = { 
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit

        }
        
    }
    res.status(200).json({
        success: true,
        count: data.length,
        pagination,
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