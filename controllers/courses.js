const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Lmsmodel');
const advancedResult = require('../middleware/advancedResult');

//@desc     Get courses
//@route    Get Api '/api/v1/courses'
//@route    Get Api '/api/v1/bootcamp/:bootcampId/courses'
//@acess    public

exports.getCourses = asyncHandler(async (req, res, next) => {



    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });
        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } else {
        res.status(200).json(res.advancedResult);
    }

    // let course = await query.populate({
    //     path: 'bootcamp',
    //     select: 'name description'
    // });;

    // res.status(200).json({
    //     success: true,
    //     count: course.length,
    //     data: course
    // })

});

//@desc     Get single courses
//@route    Get Api '/api/v1/courses/:id'
//@acess    public

exports.getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: 'name description'
    })

    if (!course) {
        return next(ErrorResponse(`No Course with the id ${req.params.id}`, 400))

    }
    res.status(200).json({
        success: true,
        count: course.length,
        data: course
    })

});

//@desc     Create single courses
//@route    POST Api '/api/v1/bootcamp/:bootcampid/courses'
//@acess    Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    try {
        req.body.bootcamp = req.params.bootcampId;
        req.body.user = req.user.id;

        const bootcamp = await Bootcamp.findById(req.params.bootcampId);

        if (!bootcamp) {
            return next(ErrorResponse(`No Bootcamp with the id ${req.params.bootcampId}`, 400))
        }

        if (bootcamp.user.toString() != req.user.id && req.user.role !== "admin") {
            return next(new ErrorResponse(`User ${req.user.id} is not authorised to add a course ${req.params.id}`, 401));
        }

        const course = await Course.create(req.body);
        res.status(200).json({
            success: true,
            count: course.length,
            data: course
        })
    } catch (e) {
        return console.log(`${e}`);

    }

});

//@desc     Delete single courses
//@route    Delete Api '/api/v1/course/:courseId'
//@acess    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`Courses not found of ${req.params.id}`, 400)
        );
    }
    if (course.user.toString() != req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${req.user.id} is not authorised to add a course ${course.id}`, 401));
    }
    await Course.deleteOne();

    res.status(200).json({
        success: true,
       
        data: {}
    });

});

//@desc     Update single courses
//@route    PUT Api '/api/v1/course/:courseId'
//@acess    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`Courses not found of ${req.params.id}`, 400)
        );    
    }

    if (course.user.toString() != req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${req.user.id} is not authorised to add a course ${course.id}`, 401));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: course
    });

});