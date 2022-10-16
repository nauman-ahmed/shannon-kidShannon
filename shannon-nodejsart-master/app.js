const bodyParser = require('body-parser');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./connection');
const routes = require('./routers/routes');



dotenv.config({
    path: '.env'
})


//connection established
connectDB();





const app = express();
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)

app.use(cors())





app.use('/public', express.static('public'))
app.use('/api', routes);




app.listen(process.env.PORT||5000, () => {
    console.log("server started");
})



// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'))
    })
})
app.use(function (err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})