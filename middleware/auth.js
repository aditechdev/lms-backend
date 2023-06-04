const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.protect = asyncHandler(async (req, res, next) => { 

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token from cookie
        token = req.headers.authorization.split(' ')[1];
    }

    else if (req.cookies.token) {
        // set token form cookies
        token = req.cookies.token;
     }

    // Make sure token exist
    if (!token) {
        return next(new ErrorResponse('Not authorised to access this route', 400));
    }

    try {

        // verify Token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);

        req.user = await User.findById(decode.id);

        next();
        
    } catch (error) {
        return next(new ErrorResponse('Not authorised to access this route', 400));     
    }
});

// Grant access to specific roles
exports.authorize = (...role) => { 
    return (req, res, next) => { 

        if (!role.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is unauthorized to access this route`, 400));     
        }
        next();
    }
}
