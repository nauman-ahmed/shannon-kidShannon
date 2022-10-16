const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    keyword: {
        type: String,
        trim: true,
        required: true
    },
    type:{
        type:Number,
        trim:true,
        required:true,
        min: 1,
        max: 2

    }
})

module.exports = mongoose.model('keywordList', schema)