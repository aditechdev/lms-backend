const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');

//@desc     Register User
//@route    Post Api '/api/v1/auth/register'
//@acess    public
exports.register = asyncHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;
    // Create User 
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user, 200, res)


    // const token = user.getSignedJwtToken();

    // res.status(200).json({
    //     success: true, token
    // });

});
//@desc     Login User
//@route    Post Api '/api/v1/auth/register'
//@acess    public
exports.signIn = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    //Validate email and password
    if (!email || !password) {

        return next(new ErrorResponse("Please provide an email and password", 400));

    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));

    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    // const token = user.getSignedJwtToken();

    // res.status(200).json({
    //     success: true, token
    // });
    sendTokenResponse(user, 200, res);

});



//@desc     Get Current login User
//@route    Post Api '/api/v1/auth/me'
//@acess    public
exports.getMe = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: 200,
        data: user
    });

    // const { email, password } = req.body;

    // //Validate email and password
    // if (!email || !password) {

    //     return next(new ErrorResponse("Please provide an email and password", 400));

    // }

    // // Check for user
    // const user = await User.findOne({ email }).select('+password');

    // if (!user) {
    //     return next(new ErrorResponse("Invalid credentials", 401));

    // }

    // // Check if password matches
    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) {
    //     return next(new ErrorResponse("Invalid credentials", 401));
    // }

    // // const token = user.getSignedJwtToken();

    // // res.status(200).json({
    // //     success: true, token
    // // });
    // sendTokenResponse(user, 200, res)

});

//@desc     Forget Password
//@route    Post Api '/api/v1/auth/forgotPassword'
//@acess    public
exports.forgetPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse("No user with this email", 400))

    }

    const getResetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${getResetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset password. Please make a PUT request to: \n\n${resetUrl}`;


    try {
        await sendEmail({
            email: user.email,
            subject: "Password reset request",
            message: message
        })

        res.status(200).json({
            success: true,
            data: 'Email Sent'
        });

    } catch (error) {

        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({
            validateBeforeSave: false
        });

        return next(new ErrorResponse("Email could not be sent", 500));

    }

});

//@desc     reset Password
//@route    Put Api '/api/v1/auth/resetPassword/:resetToken'
//@acess    public
exports.resetPassword = asyncHandler(async (req, res, next) => {

    // GetHashed Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid Token', 400))

    }

    // Set the new password
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);

});
//@desc     Update User details
//@route    Put Api '/api/v1/auth/updateDetails'
//@acess    private
exports.updateDetails = asyncHandler(async (req, res, next) => {

    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        success: true,
        data: user
    });

});

// Get token from model, create cookies and send response
const sendTokenResponse = (user, statusCode, res) => {

    // Create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV == 'production') {
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });

}