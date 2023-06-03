const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotEnv = require('dotenv');

// Load env vars
dotEnv.config({ path: './config/config.env' });

//Load Models
const LMS = require('./models/Lmsmodel');
const Course = require('./models/Course');
const User = require('./models/User');
const Review = require('./models/Review');
// const { json } = require('express');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Read Json Files
const lmsFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`)); 
const courseFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, `utf-8`)); 
const userFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, `utf-8`)); 
const reviewFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, `utf-8`)); 

// Import into DB
const importData = async () => { 
    try {
        await LMS.create(lmsFile);
        await Course.create(courseFile);
        await User.create(userFile);
        await Review.create(reviewFile);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red);
        
    }
}


// Delete Data
const deleteData = async () => {
    try {
        await LMS.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red);

    }
}


if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();

}
