const mongoose = require("mongoose");

const connectDB = async() => { 

    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`);
}

module.exports = connectDB;

// , {
//     useNewUrlParser: true,
//         useCreateIndex: true,
//             useFindAndModify: false
// }