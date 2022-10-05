const mongoose = require('mongoose');

const Modules = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
}, { collection: 'modules' })

module.exports = mongoose.model('Modules', Modules)