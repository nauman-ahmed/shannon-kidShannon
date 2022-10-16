const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    bannerName: {
        type: String,
        trim: true,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    aspectRatio: {
        width: {
            type: String,
            default: "0000",
        },
        height: {
            type: String,
            default: "0000",
        }
    }
})


module.exports = mongoose.model('Banners', schema)