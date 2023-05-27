const errorHandler = require('../middleware/error');
const ErrorResponse = require('../utils/errorResponse')
const LMS = require('../models/Lmsmodel');

//@desc     Get All bootcamp
//@route    Get Api '/api/v1/bootcamp'
//@acess    public
exports.getBootcamp = async (req, res, next) => {

    try {

        const data = await LMS.find();
        res.status(200).json({
            success: true,
            count: data.length,
            data: data,
        });

    } catch (e) {
        // console.log(e);
        next(e);

    }
}

//@desc     Get single bootcamp
//@route    Get Api '/api/v1/bootcamp/:id'
//@acess    public
exports.getSingleBootcamp = async (req, res, next) => {
    try {
        const lms = await LMS.findById(req.params.id)
        if (!lms) {
            return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: lms
        });

    } catch (e) {
        // console.log(e);
        // res.status(400).json({ success: false, data: [] });
        // next(new ErrorResponse(`Bootcamp not found of ${req.params.id}`, 404));
        next(e);
    }


}

//@desc     Create new bootcamp
//@route    POST Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.createBootcamp = async (req, res, next) => {
    // console.log(req.body);
    try {
        const lms = await LMS.create(req.body);
        res.status(201).json({
            success: true,
            data: lms
        });
    } catch (error) {
        console.log(`${error}`.red);
        next(error);
    }

}

//@desc     Update bootcamp
//@route    PUT Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.updateBootcamp = async (req, res, next) => {

    try {
        const lms = await LMS.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!lms) {
            return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));

        }
        res.status(200).json({ success: true, data: lms });

    } catch (error) {
        next(error);

    }

}

//@desc     Delete bootcamp
//@route    Delete Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.deleteBootcamp = async (req, res, next) => {

    try {
        const lms = await LMS.findByIdAndDelete(req.params.id);
        if (!lms) {
            return next(new ErrorResponse(`Resources not found of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: {}
        })

    } catch (e) {
        next(e);
    }
    
}