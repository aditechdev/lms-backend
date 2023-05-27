const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => { 
    let e = { ...error };
    e.message = error.message;

    // Log to console for dev
    console.log(error.stack.red);

    // Moongoose Error
    if (error.name === "CastError") {
        const message = `Resources not found of ${error.value}`;
        e = new ErrorResponse(message, 404)
    }
    // console.log(error.name);

    res.status(e.statusCode || 500).json({
        success: false,
        error: e.message || 'Server Error'
    });
}

module.exports = errorHandler;