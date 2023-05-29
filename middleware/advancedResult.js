const advancedResult = (model, populate) => async (req, res, next) => {
    
    // console.log(req.query);
    let query;
    // Copy request query
    const reqQuery = { ...req.query };

    // Field to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over remove field and delete them for req querry
    removeFields.forEach(param => delete reqQuery[param])

    // console.log(reqQuery);

    // Creat query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    // console.log(queryStr);
    // Find resource
    query = model.find(JSON.parse(queryStr));

    // SELECT FIELD
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        console.log(fields);
        query.select(fields);

    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split('.').join(' ');
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query = query.populate(populate);
        
    }
    // executing query
    const results = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit

        }

    }

    res.advancedResult = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();

};

module.exports= advancedResult;