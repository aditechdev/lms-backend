//@desc     Logs request to console
const loggeer = (req, res, next) => {
    console.log(`middddle ware ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = loggeer;