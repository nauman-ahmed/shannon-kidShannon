const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    adminUsers = require('./../models/AdminUser'),
    generator = require('generate-password'),
    nodemailer = require('nodemailer');

exports.register = async (req, res, next) => {
    const {
        hash_password
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    req.body.hash_password = bcrypt.hashSync(hash_password, salt);
    var admin = new adminUsers(req.body);
    admin.save(function (err, admin) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            admin.hash_password = undefined;
            return res.json({
                username: admin.username,
                email: admin.email,
                msg: "registered"
            });
        }
    });
}
exports.login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    adminUsers.findOne({
        email: email
    }, function (err, admin) {
        if (err) throw err;
        if (!admin || !bcrypt.compareSync(password, admin.hash_password)) {
            return res.json({
                message: 'Authentication failed. Invalid user or password.'
            });
        }
        return res.json({
            token: jwt.sign({
                email: admin.email,
                firstname: admin.username,
                _id: admin._id,
            }, 'RESTFULAPIsADMIN', {
                expiresIn: "2h"
            }),
        });
    });

}
exports.updateProfile = function (req, res, next) {

    adminUsers.findOneAndUpdate({
        _id: req.auth._id
    }, req.body, {
        new: true
    }, function (err, admin) {
        if (err) {
            return res.json({
                message: "somgthing is wrong"
            });
        } else {
            admin.hash_password = undefined;
            return res.json(admin);
        }
    });



};






exports.create = async (req, res, next) => {
   

        // const hash_password = generator.generate({
        //     length: 10,
        //     numbers: true
        // });
        const {
            hash_password
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        req.body.hash_password = bcrypt.hashSync(hash_password, salt);
        var admin = new adminUsers(req.body);
        admin.save(function (err, admin) {
            if (err) {
                return res.json("somgthing is wrong" + err.message);
            } else {
                return res.json("Successfully created");
            }
        });

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'artisttesttesting@gmail.com',
        //         pass: 'emuvezdvtcxlpzdt'
        //     }
        // });

        // var mailOptions = {
        //     from: 'artisttesttesting@gmail.com',
        //     to: req.body.email,
        //     subject: 'Artist System Credentials',
        //     text: "email :" + req.body.email + "password: " + hash_password
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         return res.json("Email is an Issue");
        //     } else {
               
            
        // });
    
}


exports.getAll = function (req, res, next) {
    try {
        adminUsers.find({},
            '-hash_password',
            function (err, admin) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    return res.json(admin);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }



};



exports.singleDelete = async function (req, res, next) {
    try {
        const deleteAdmin = await adminUsers.find({
            _id: req.body.id
        });
        const data = await deleteAdmin[0].delete();
        return res.json("successfully deleted");
    } catch (err) {
        return res.json(err.message);
    }



};


exports.singleUpdate = async function (req, res, next) {
    try {
        const changeAdmin = await adminUsers.find({
            _id: req.body.id
        });
        changeAdmin[0].name = req.body.name;
        changeAdmin[0].username = req.body.username;
        changeAdmin[0].email = req.body.email;
        const salt = await bcrypt.genSalt(10);
        req.body.hash_password = bcrypt.hashSync(req.body.hash_password, salt);
        changeAdmin[0].hash_password = req.body.hash_password;
        changeAdmin[0].Role = req.body.Role;
        const data = await changeAdmin[0].save();
        return res.json("successfully updated");
    } catch (err) {
        return res.json(err.message);
    }

};


exports.forgetPassword = async function (req, res, next) {
    try {
        const changeAdmin = await adminUsers.find({
            email: req.body.email
        });
        if(changeAdmin.length > 0){
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

            transporter.sendMail(mailOptions,async function (error, info) {
                if (error) {
                    return res.json("Email is an Issue" + error.message);
                } else {
                    hash_password = bcrypt.hashSync(hash_password, salt);
                    changeAdmin[0].hash_password = hash_password;
            
                    const data = await changeAdmin[0].save();
                    return res.json("Check your email");

                }
            });
            
        }
        else{
            return res.json("Email not exist");
        }
       
    } catch (err) {
        return res.json("check your email");
    }

};