const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [String],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    correctAnswers: {
        type: [String],
        required: true,
        trim: true,
    }
});
module.exports = mongoose.model("quiz", quizSchema);
