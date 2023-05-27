const LMS = require('../models/Lmsmodel');

//@desc     Get All bootcamp
//@route    Get Api '/api/v1/bootcamp'
//@acess    public
exports.getBootcamp = async (req, res, next) => {

    try {

        const data = await LMS.find();
        res.status(200).json({
            success: true,
            data: data,
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
        })

    }
}

//@desc     Get single bootcamp
//@route    Get Api '/api/v1/bootcamp/:id'
//@acess    public
exports.getSingleBootcamp = async (req, res, next) => {
    try {
        const lms = await LMS.findById(req.params.id)
        if (!lms) {
            return res.status(400).json({ success: false, data: [] });

        }

        res.status(200).json({
            success: true,
            data: lms
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false, data: [] });
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
        res.status(500).json({
            success: false
        })
    }

}

//@desc     Update bootcamp
//@route    PUT Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`
    });

}

//@desc     Delete bootcamp
//@route    Delete Api '/api/v1/bootcamp/:id'
//@acess    Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    });
}