const mongoose = require('mongoose'),
    contactList = require('./../models/contactList');

exports.Create = async (req, res, next) => {
    req.body.status = 0;
    var contactlist = new contactList(req.body);
    contactlist.save(function (err, contactlist) {
        if (err) {
            return res.json("Msg: "+err);
            // return res.json("Error In Submission Check Fields or Contact Admin ");
        } else {
            return res.json("successfully created");
        }
    });
}


exports.findById = (req, res, next) => {

    contactlist.findOne({
        _id: req.body._id
    }, function (err, contact) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            if (contact) {
                return res.json(
                    contact
                );
            } else {
                return res.json({
                    msg: "Not Found"
                });
            }
        }

    });
}

exports.deleteById = function (req, res, next) {
    try {
        contactList.deleteOne({
            _id: req.body._id
        }, req.body, function (err, contact) {
            if (err) {
                return res.json({
                    message: "somgthing went wrong"
                });
            } else {
                return res.json({
                    msg: "delete Successfully"
                });
            }
        });
    } catch (err) {
        return res.json(err.message);
    }



};

exports.getAll =async function (req, res, next) {
    try {
        const changeContact = await contactList.find({}).populate('artistId', '-hash_password');
        return res.json(changeContact);
    } catch (err) {
        return res.json(err.message);
    }



};


exports.updateSingle = async function (req, res, next) {


    try {
        const changeContact = await contactList.find({
            _id: req.body.id
        });
        changeContact[0].message = req.body.message;
        changeContact[0].status = 1;
        const data = await changeContact[0].save();
        return res.json("successfully updated");

    } catch (err) {
        return res.json(err.message);
    }

};