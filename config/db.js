const mongoose = require("mongoose");

const connectDB = async() => { 

    const con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${con.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;

// , {
//     useNewUrlParser: true,
//         useCreateIndex: true,
//             useFindAndModify: false
// }