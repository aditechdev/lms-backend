const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => { 
    let e = { ...error };
    e.message = error.message;

    // Log to console for dev
    console.log(error);
    // console.dir(error)

    // Moongoose Error
    if (error.name === "CastError") {
        const message = `Resources not found of ${error.value}`;
        e = new ErrorResponse(message, 404)
    }

    if (error.code === 11000) {
        const message = `Duplicate field value entered`;
        e = new ErrorResponse(message, 400)
    }

    if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map(val => val.message);
        e = new ErrorResponse(message, 400)

        
    }
    // console.log(error.name);

    res.status(e.statusCode || 500).json({
        success: false,
        error: e.message || 'Server Error'
    });
}

module.exports = errorHandler;