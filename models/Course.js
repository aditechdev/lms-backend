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

// Call getAverageCost After Save
// CourseSchema.goFish();

// const courses = Course.find();

// courses.goFish();

// Static method to get average cost
CourseSchema.statics.getAverageCost = async function (bootcampId) { 
    console.log('Calculation average cost');
    const obj = await this.aggregate([
        {
            $match: {bootcamp: bootcampId}
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: {
                    $avg: '$tuition'
                }
            }
        }
    ]);

    try {
        await this.model('LMS').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
        });
        
    } catch (e) {
        console.log(e);

        
    }
}

// Call getAverageCost After Save
CourseSchema.post('save', function () { 
    this.constructor.getAverageCost(this.bootcamp);
    
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function () { 
 
    this.constructor.getAverageCost(this.bootcamp);


});

module.exports = mongoose.model('Course', CourseSchema);