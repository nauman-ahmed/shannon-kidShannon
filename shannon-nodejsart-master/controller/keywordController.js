const mongoose = require('mongoose'),
    keywordModel = require('./../models/keyword'),
    imageOfArtist = require('./../models/imageOfArtist'),
    artistUsers = require('./../models/artistModel');


exports.Create = async (req, res, next) => {

    var keyword = new keywordModel(req.body);
    keyword.save(function (err, keyword) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json("successfully added");
        }
    });
}

exports.findById = (req, res, next) => {

    keywordModel.findOne({
        _id: req.body._id
    }, function (err, keyword) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            if (banner) {
                return res.json(
                    keyword
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

    keywordModel.deleteOne({
        _id: req.body._id
    }, req.body, function (err, keyword) {
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


exports.getAll = function (req, res, next) {
    try {
        keywordModel.find({},
            function (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    return res.json(keywords);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }



};
exports.getAllClient = function (req, res, next) {
    try {
        keywordModel.find({type:1},
            function (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    return res.json(keywords);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }



};

exports.getAllClientKid = function (req, res, next) {
    try {
        keywordModel.find({type:2},
            function (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    return res.json(keywords);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }



};


exports.getKeywordKidShanon = function (req, res, next) {
    try {
        keywordModel.find({keyword:req.body.keyword},
        async function  (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    let artist =await artistUsers.find({}) 
                    let allData = await Promise.all(artist.map(async (item,key)=>{
                        let image = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]?._id,artistId: item._id}).populate({path:"mainImage.keywordID",match:{type:2}})) 
                        return {artistId:item,ImageData:image}
                   }))
                   let filteredData  = allData.filter(val => val.ImageData.length > 0)
                   return res.json(filteredData);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }

};

exports.getAllIllustration = function (req, res, next) {
    try {
        keywordModel.find({keyword:"ILLUSTRATION"},
        async function  (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    let artist =await artistUsers.find({}) 
                    let allData = await Promise.all(artist.map(async (item,key)=>{
                        let image = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id,artistId: item._id})) 
                        return {artistId:item,ImageData:image}
                   }))
                   let filteredData  = allData.filter(val => val.ImageData.length > 0)
                   return res.json(filteredData);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }

};


exports.getAllCgi = function (req, res, next) {
    try {
        keywordModel.find({keyword:"CGI"},
        async function  (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    let artist =await artistUsers.find({})
                //     var data = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id})) 
                    let allData = await Promise.all(artist.map(async (item,key)=>{
                        let image = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id,artistId: item._id})) 
                        return {artistId:item,ImageData:image}
                   }))
                   let filteredData  = allData.filter(val => val.ImageData.length > 0)
                   return res.json(filteredData);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }

};

exports.getAllMotion = function (req, res, next) {
    try {
        keywordModel.find({keyword:"MOTION"},
        async function  (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    let artist =await artistUsers.find({})
                //     var data = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id})) 
                    let allData = await Promise.all(artist.map(async (item,key)=>{
                        let image = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id,artistId: item._id})) 
                        return {artistId:item,ImageData:image}
                   }))
                   let filteredData  = allData.filter(val => val.ImageData.length > 0)
                   return res.json(filteredData);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }

};

exports.getAllMedical = function (req, res, next) {
    try {
        keywordModel.find({keyword:"MEDICAL"},
        async function  (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    let artist =await artistUsers.find({})
                //     var data = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id})) 
                    let allData = await Promise.all(artist.map(async (item,key)=>{
                        let image = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id,artistId: item._id})) 
                        return {artistId:item,ImageData:image}
                   }))
                   let filteredData  = allData.filter(val => val.ImageData.length > 0)
                   return res.json(filteredData);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }

};

exports.getAllPhotography = function (req, res, next) {
    try {
        keywordModel.find({keyword:"PHOTOGRAPHY"},
        async function  (err, keywords) {
                if (err) {
                    return res.json("somgthing went wrong");
                } else {
                    let artist =await artistUsers.find({})
                //     var data = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id})) 
                    let allData = await Promise.all(artist.map(async (item,key)=>{
                        let image = await (imageOfArtist.find({"mainImage.keywordID": keywords[0]._id,artistId: item._id})) 
                        return {artistId:item,ImageData:image}
                   }))
                   let filteredData  = allData.filter(val => val.ImageData.length > 0)
                   return res.json(filteredData);
                }
            });
    } catch (err) {
        return res.json(err.message);
    }

};
