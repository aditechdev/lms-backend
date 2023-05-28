const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');

//@desc     Get courses
//@route    Get Api '/api/v1/courses'
//@route    Get Api '/api/v1/bootcamp/:bootcampId/courses'
//@acess    public

exports.getCourses = asyncHandler(async (req, res, next) => { 

    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else { 
        query = Course.find().populate({
            path: 'bootcamp',
            select:'name description'
        })
    }

    let course = await query;

    res.status(200).json({
        success: true,
        count: course.length,
        data: course
    })

});