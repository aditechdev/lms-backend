const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Please add title for reviews'],
        maxLenght: 100
    },
    text: {
        type: String,
        required: [true, 'Please add some text'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required:[true, 'Please add a rating between 1 to 10']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'LMS',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }


});


// Prevent user from submiting 1 Review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
    console.log('Calculation average cost');
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRating: {
                    $avg: '$rating'
                }
            }
        }
    ]);

    try {
        await this.model('LMS').findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
        });

    } catch (e) {
        console.log(e);


    }
}

// Call getAverageCost After Save
ReviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.bootcamp);

});

// Call getAverageCost before remove
ReviewSchema.pre('remove', function () {

    this.constructor.getAverageRating(this.bootcamp);


});

module.exports = mongoose.model("Review", ReviewSchema)


