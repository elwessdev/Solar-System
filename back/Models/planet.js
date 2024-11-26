const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (url) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);
            },
            message: 'Invalid URL format for image',
        },
    },
    distanceFromSun: {
        type: Number,
        required: true,
    },
    mass: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    gallery: {
        type: [String],
        validate: {
            validator: function (urls) {
                return urls.every((url) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url));
            },
            message: 'Gallery must only contain valid URLs',
        },
    },
    videos: {
        type: [String],
        validate: {
            validator: function (urls) {
                return urls.every((url) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url));
            },
            message: 'Videos must only contain valid URLs',
        },
    },
    comments: [commentSchema],
});

module.exports = mongoose.model('planet', planetSchema);
