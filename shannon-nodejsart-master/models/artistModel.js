const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        lowercase: true,
        unique:true
    },
    hash_password: {
        type: String,
        required:true
      },
    address: {
        type: String,
      },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    status:{
        type: Number,
        default:0,
        min: 0,
        max: 1
    },
    type:{
        type: String,
        default:"None",
    },
    bio:{
        type: String,
        default:"",
    },
    date:{
        type:Date,
        default:Date.now()
    },
    orderArtist:{
        type:Number,
        default:100000
    },
    artistDir:{
        type: String,
    },
    
})


module.exports = mongoose.model('artistUsers', schema)
