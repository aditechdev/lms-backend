const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc     Register User
//@route    Get Api '/api/v1/auth/register'
//@acess    public
exports.register = asyncHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;
    // Create User 
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true, token
    });

});