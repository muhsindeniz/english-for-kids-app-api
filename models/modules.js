const mongoose = require('mongoose');

// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0');
// var yyyy = today.getFullYear();
// today = yyyy + '/' + mm + '/' + dd;

var Modules = new mongoose.Schema({
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