const mongoose = require('mongoose');
const slugify = require('slugify')
const geoCoder = require('../utils/geocoder');
const LMSSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true, 
        trim: true, 
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add description'],
        maxLength:[500, "Description cannot be more than 500"]
    },
    website: {
        type: String,
        match: [
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            'Please add valid url with http or https'
        ]
    },
    phone: {
        type: String,
        maxLength: [
            20,
            'Please add valid phone number'
        ]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add valid email'
        ]
    },
    address: {
        type: String,
        required: [
            true,
            'Please add address'
        ]
    },
    location: {
        // GeoJson Coordinate
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formaattedAdress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be atleast 1'],
        max: [10, 'Rating cannot be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssitance: {
        type: Boolean,
        default: false,
    },
    jobGurantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Create lms slug from the name

LMSSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    // console.log("Slugify ran", this.name);
    next();
});

// GeoCoder & Create Location Field
LMSSchema.pre('save', async function (next) {
    const loc = await geoCoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formaattedAdress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    }

    // DO not save address in DB
    this.address = undefined;
    next();
});

// Cascade delete course when a bootcam is deleted
LMSSchema.pre('deleteOne', { document: true, query: true }, async function (next) {
    console.log(`courses being removed ${this._id}`);
    await this.model('Course').deleteMany({ bootcamp: this._id });
    next();
});

LMSSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
})




module.exports = mongoose.model('LMS', LMSSchema);