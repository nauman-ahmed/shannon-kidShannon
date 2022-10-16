const mongoose = require('mongoose');


const schema = new mongoose.Schema({

    mainImage: [{
        title: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true,
            min:0,
            max:1
        },
        path: {
            type: String,
            required: true
        },
        orderPortfolio: {
            type: Number,
            default: 1000
        },
        subImage: [{
            Name: {
                type: String,
                requried: true
            },
            path: {
                type: String,
                required: true
            },
            // aspectRatio: {

            //     width: {
            //         type: String,
            //         required: true,
            //     },
            //     height: {
            //         type: String,
            //         required: true,
            //     }
            // }
        }],
        keywordID: [{
            type: mongoose.Types.ObjectId,
            ref: 'keywordList'
        }]
    }],
    artistId: {
        type: mongoose.Types.ObjectId,
        ref: 'artistUsers',
        unique: true
    },


})


module.exports = mongoose.model('imageOfArtist', schema)