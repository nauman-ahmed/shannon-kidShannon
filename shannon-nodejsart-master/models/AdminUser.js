const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    Role: {
        type: Number,
        required: true,
        min: 1,
        max: 2
    },
    date:{
        type:Date,
        default:Date.now()
    },


})


module.exports = mongoose.model('AdminUsers', schema)