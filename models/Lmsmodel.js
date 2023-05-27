const mongoose = require('mongoose');

const LMSSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name'],
        unique: true, 
        trim: true, 
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        require: [true, 'Please add description'],
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
        require: [
            true,
            'Please add address'
        ]
    },
    location: {
        // GeoJson Coordinate
        type: {
            type: String,
            enum: ['Point'],
            require: true,
        },
        coordinates: {
            type: [Number],
            require: true,
            index: '2dsphere'
        },
        formaattedAdress: String,
        stree: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        require: true,
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

})

module.exports = mongoose.model('LMS', LMSSchema);