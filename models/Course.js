const mongoose = require('mongoose');
const slugify = require('slugify')

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add course title']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add description title']
    },
    weeks: {
        type: String,
        trim: true,
        required: [true, 'Please add number in weeks']
    },
    tuition: {
        type: Number,
        trim: true,
        required: [true, 'Please add tution cost']
    },
    minimumSkill: {
        type: String,
        trim: true,
        required: [true, 'Please add minimum skill'],
        enum: ['beginner', 'intermediate', 'advansed']
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'LMS',
        required: true
    }

});

module.exports = mongoose.model('Course', CourseSchema);