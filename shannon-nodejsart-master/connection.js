const mongoose = require('mongoose')


// const url = 'mongodb+srv://yasiryaseen:LS35rbvvp10y6KTC@projectart.74s3w7x.mongodb.net/ArtworkAPI'
// const url = 'mongodb://localhost:27017/ArtworkAPI?readPreference=primary&directConnection=true&ssl=false'
 const url = "mongodb+srv://nauman:niksonboy123@cluster0.ogjnj.mongodb.net/ArtoworkAPI"

const connectDB = async () => {
    await mongoose.connect(url).
    then(async (x) => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        })
        .catch((err) => {
            console.error('Error connecting to mongo', err.reason)
        })
}


module.exports = connectDB;