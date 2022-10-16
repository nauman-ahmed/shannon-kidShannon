const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true,
        required: true
    },
    company: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    purposeOfInquiry: {
        type: String,
        default: 0
    },
    findUs: {
        type: String,
        default: "",
    },
    message:{
        type: String,
        default: "",
    },
    artistId: [{
        type:mongoose.Types.ObjectId,
        ref: 'artistUsers',
        required:true
    }],
    status:{
        type: Number,
        default:0, 
        min: 0,
        max: 1
    },

})


module.exports = mongoose.model('contactList', schema)