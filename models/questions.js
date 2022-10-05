const mongoose = require('mongoose');

const Questions = new mongoose.Schema({
    question: {
        type: String,
        default: ''
    },
    questionType: {
        type: String,
        default: ''
    },
    categoryName: {
        type: String,
        default: ''
    },
    questionIcon: {
        type: String,
        default: ''
    },
    answerA: {
        type: String,
        default: ''
    },
    answerB: {
        type: String,
        default: ''
    },
    answerC: {
        type: String,
        default: ''
    },
    answerD: {
        type: String,
        default: ''
    },
    correctAnswer: {
        type: Number,
        default: null
    }
}, { collection: 'questions' })

module.exports = mongoose.model('Questions', Questions)