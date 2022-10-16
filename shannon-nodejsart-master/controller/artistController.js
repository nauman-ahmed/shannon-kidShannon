const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    artistUsers = require('./../models/artistModel'),
    generator = require('generate-password'),
    nodemailer = require('nodemailer'),
    keyword = require("./../models/keyword"),
    imageArtist = require('./../models/imageOfArtist');

exports.register = async (req, res, next) => {

    artistUsers.findOne({
        email: req.body.email
    }, function (err, artistUser) {
        if (err) throw err;
        if (artistUser) {
            return res.status(200).json('Artist Already Exist');
        } else {
            registerArtist(req, res, next)
        }
    });
}

registerArtist = async (req, res, next) => {

    const hash_password = generator.generate({
        length: 10,
        numbers: true
    });

    const salt = await bcrypt.genSalt(10);
    req.body.hash_password = bcrypt.hashSync(hash_password, salt);
    var artistUser = new artistUsers(req.body);
    artistUser.save(function (err, artist) {
        if (err) {
            return res.json("somgthing is wrong");
        } else {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'artisttesttesting@gmail.com',
                    pass: 'emuvezdvtcxlpzdt'
                }
            });

            var mailOptions = {
                from: 'artisttesttesting@gmail.com',
                to: req.body.email,
                subject: 'Artist System Credentials',
                text: "email: " + req.body.email + "  password: " + hash_password
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.json("Email is an Issue" + error);
                } else {


                }
            });
            return res.json("Successfully created");
        }
    });
}


exports.login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    artistUsers.findOne({
        email: email
    }, function (err, artistUser) {
        if (err) throw err;
        if (!artistUser || !bcrypt.compareSync(password, artistUser.hash_password)) {
            return res.status(200).json({
                message: 'Authentication failed. Invalid user or password.'
            });
        }
        if (artistUser.status === 0) {
            return res.status(200).json({
                message: 'Unauthorized User'
            });
        } else {
            return res.json({

                token: jwt.sign({
                    email: artistUser.email,
                    firstname: artistUser.firstname,
                    _id: artistUser._id
                }, 'RESTFULAPIs', {
                    expiresIn: "2h"
                }),
            });
        }
    });

}


exports.updateProfile = function (req, res, next) {

    artistUsers.findOneAndUpdate({
        _id: req.auth._id
    }, req.body, {
        new: true
    }, function (err, artist) {
        if (err) {
            return res.json({
                message: "somgthing is wrong"
            });
        } else {
            artist.hash_password = undefined;
            return res.json(artist);
        }
    });



};



exports.updateProfile = function (req, res, next) {

    artistUsers.findOneAndUpdate({
        _id: req.auth._id
    }, req.body, {
        new: true
    }, function (err, artist) {
        if (err) {
            return res.json({
                message: "somgthing is wrong"
            });
        } else {
            artist.hash_password = undefined;
            return res.json(artist);
        }
    });



};


exports.create = async (req, res, next) => {
    try {
        const hash_password = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt(10);
        req.body.hash_password = bcrypt.hashSync(hash_password, salt);
        var artistUser = new artistUsers(req.body);
        artistUser.save(function (err, artistUser) {
            if (err) {
                return res.json("somgthing is wrong" + err.message);
            } else {
                return res.json("Successfully created");
            }
        });
    } catch (err) {
        return res.json(err.message);
    }
}


exports.orderArtistAll = async function (req, res, next) {
    const artists = await artistUsers.find({})
    for (let i = 0; i < artists.length; i++) {
        for (let j = 0; j < artists.length; j++) {
            if (req.body[j]) {
                if (artists[i]._id.toString() === req.body[j]["_id"]) {
                    artists[i].orderArtist = req.body[j]["orderArtist"]
                    artists[i].save()
                }
            }
        };
    };
    return res.json("Recieved");
};

exports.getAll = function (req, res, next) {
    try {
        artistUsers.find({},
            '-hash_password',
            function (err, artist) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    for (let i = 0; i < artist.length; i++) {
                        for (let j = 0; j < artist.length - i - 1; j++) {
                            if (artist[j + 1].orderArtist < artist[j].orderArtist) {
                                [artist[j + 1], artist[j]] = [artist[j], artist[j + 1]]
                            }
                        }
                    };
                    return res.json(artist);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }



};


exports.getAllClient = async function (req, res, next) {
    try {
        const keywordData = await keyword.find({
            type: 1
        });
        let data = await Promise.all(keywordData.map(async (item, key) => {
            return await imageArtist.find({
                "mainImage.status": 1,
                "mainImage.keywordID": item._id
            }).populate({
                path: 'artistId',
                match: { status: { $eq: 1 } },
                select:'-hash_password'
            });
        }))
        let artistrep = data.map((item, key) => (item.map((item1, key1) => (item1.artistId))))
        let artistsingle = [].concat(...artistrep);
        const uniqueArtist = [...new Map(artistsingle.map((A) =>A!==null?[String(A._id), A]:[])).values()];
        return res.json(uniqueArtist.filter(Boolean))

    } catch (err) {
        return res.json(err.message);
    }



};

exports.getAllClientKid = async function (req, res, next) {
    try {
        const keywordData = await keyword.find({
            type: 2
        });
        let data = await Promise.all(keywordData.map(async (item, key) => {
            return await imageArtist.find({
                "mainImage.status": 1,
                "mainImage.keywordID": item._id
            }).populate({
                path: 'artistId',
                match: { status: { $eq: 1 } },
                select:'-hash_password'
            });
        }))
        let artistrep = data.map((item, key) => (item.map((item1, key1) => (item1.artistId))))
        let artistsingle = [].concat(...artistrep);
        const uniqueArtist = [...new Map(artistsingle.map((A) =>A!==null?[String(A._id), A]:[])).values()];
        return res.json(uniqueArtist.filter(Boolean))

    } catch (err) {
        return res.json(err.message);
    }



};




exports.singleDelete = async function (req, res, next) {
    try {
        const deleteArtist = await artistUsers.find({
            _id: req.body.id
        });
        const data = await deleteArtist[0].delete();
        return res.json("Successfully Deleted");
    } catch (err) {
        return res.json(err.message);
    }



};


exports.singleUpdate = async function (req, res, next) {


    try {
        const changeArtist = await artistUsers.find({
            _id: req.body.id
        });
        changeArtist[0].status = 1;
        const data = await changeArtist[0].save();
        return res.json("Successfully updated");

    } catch (err) {
        return res.json(err.message);
    }

};


exports.updateBio = async function (req, res, next) {


    try {
        const changeArtist = await artistUsers.find({
            _id: req.body._id
        });
        changeArtist[0].bio = req.body.bio;
        const data = await changeArtist[0].save();
        return res.json("successfully Updated");
    } catch (err) {
        return res.json(err.message);
    }

};




exports.updateArtist = async function (req, res, next) {


    try {
        const changeArtist = await artistUsers.find({
            _id: req.body._id
        });
        changeArtist[0].firstname = req.body.firstname;
        changeArtist[0].lastname = req.body.lastname;
        changeArtist[0].email = req.body.email;
        changeArtist[0].state = req.body.state;
        changeArtist[0].city = req.body.city;
        changeArtist[0].address = req.body.address;
        changeArtist[0].status = req.body.status;
        changeArtist[0].type = req.body.type;

        const data = await changeArtist[0].save();
        return res.json("successfully Updated");
    } catch (err) {
        return res.json(err.message);
    }

};



exports.forgetPassword = async function (req, res, next) {
    try {
        const changeArtist = await artistUsers.find({
            email: req.body.email
        });
        if (changeArtist.length > 0) {
            let hash_password = generator.generate({
                length: 10,
                numbers: true
            });
            const salt = await bcrypt.genSalt(10);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'artisttesttesting@gmail.com',
                    pass: 'emuvezdvtcxlpzdt'
                }
            });

            var mailOptions = {
                from: 'artisttesttesting@gmail.com',
                to: req.body.email,
                subject: 'Artist System Credentials',
                text: "email: " + req.body.email + "  password: " + hash_password
            };

            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    return res.json("Email is an Issue" + error.message);
                } else {
                    hash_password = bcrypt.hashSync(hash_password, salt);
                    changeArtist[0].hash_password = hash_password;
                    const data = await changeArtist[0].save();
                    return res.json("Check your email");

                }
            });
        } else {
            return res.json("Email not exist");
        }

    } catch (err) {
        return res.json("check your email");
    }

};