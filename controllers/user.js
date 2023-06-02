const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc     get all  User
//@route    get Api '/api/v1/auth/users'
//@acess    private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {

    res.status(200).json(
        res.advancedResult
    )
});

//@desc     get all  User
//@route    get Api '/api/v1/auth/users/:id'
//@acess    private/admin
exports.getSingleUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json(
        {
            success: true,
            data: user
        }
    )
});

//@desc     get all  User
//@route    post Api '/api/v1/auth/users'
//@acess    private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json(
        {
            success: true,
            data: user
        }
    )
});

//@desc     Update  User
//@route    put Api '/api/v1/auth/users/:id'
//@acess    private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(
        {
            success: true,
            data: user
        }
    )
});

//@desc     Delete  User
//@route    put Api '/api/v1/auth/users/:id'
//@acess    private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json(
        {
            success: true,
            data: {}
        }
    )
});

