const mongoose = require('mongoose'),
    bannersModel = require('./../models/Banners'),
    sizeOf = require('image-size');

exports.Create = async (req, res, next) => {
    const dimensions = sizeOf(req.body.firebaseURL)
    let banerJson = {
        bannerName: req.body.name,
        imagePath: req.body.firebaseURL,
        aspectRatio: {
            width: dimensions.width,
            height: dimensions.height
        }
    }

    var banner = new bannersModel(banerJson);
    banner.save(function (err, banner) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json({
                msg: "Add Banner",
                data: banner
            });
        }
    });

}

exports.findById = (req, res, next) => {

    bannersModel.findOne({
        _id: req.body._id
    }, function (err, banner) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            if (banner) {
                return res.json(
                    banner
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

    bannersModel.deleteOne({
        _id: req.body._id
    }, req.body, function (err, banner) {
        if (err) {
            return res.json({
                message: "somgthing is wrong"
            });
        } else {
            return res.json({
                msg: "delete Successfully"
            });
        }
    });



};


exports.singleUpdate = async function (req, res, next) {
    try {
        const banner = await bannersModel.find({
            _id: req.body.id
        });
        banner[0].imagePath = req.body.firebaseURL;
        const dimensions = sizeOf(req.body.firebaseURL)
        banner[0].aspectRatio= {
            width: dimensions.width,
            height: dimensions.height
        }
        const data = await banner[0].save();
        return res.json("successfully updated");
    } catch (err) {
        return res.json(err.message);
    }

};

exports.getAll = function (req, res, next) {
    try {
        bannersModel.find({},
            '-hash_password',
            function (err, banner) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    return res.json(banner);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }



};