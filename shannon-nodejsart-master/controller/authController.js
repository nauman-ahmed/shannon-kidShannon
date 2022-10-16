const jwt = require('jsonwebtoken')
const util = require('util');
const jwtVerifyAsync = util.promisify(jwt.verify);


exports.authArtist = async (req, res, next) => {

    if (req.headers && req.headers.authorization) {
        var token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });
        jwt.verify(token, "RESTFULAPIs", function (err, decoded) {
            if (err) return res.status(401).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

            next();
        });
    }
    else{
        if (!token) return res.status(401).send('No token provided');
    }
};



exports.authAdmin = async (req, res, next) => {

    if (req.headers && req.headers.authorization) {
        var token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });
        jwt.verify(token, "RESTFULAPIsADMIN", function (err, decoded) {
            if (err) return res.status(401).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

            next();
        });
    }
    else{
        if (!token) return res.status(401).send('No token provided');
    }
};