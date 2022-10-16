const {
    ObjectId
} = require('mongodb');
const mongoose = require('mongoose'),
    imageOfArtist = require('./../models/imageOfArtist'),
    artistUsers = require('./../models/artistModel'),
    Keyword = require('../models/keyword');
sizeOf = require('image-size');


exports.Create = async (req, res, next) => {
    let firstImage = req.body.firebaseURL1;
    let secondImage = req.body.firebaseURL2;
    let thirdImage = req.body.firebaseURL3;
    const _id = req.body._id;
    const title = req.body.title;
    const k_id = req.body.k_id.split(',');
    imageOfArtist.findOne({
        artistId: _id
    }, function (err, artistImage) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            if (!artistImage) {
                let artistJson = {
                    mainImage: [{
                        title: title,
                        status: 0,
                        path: req.body.firebaseURL1,
                        subImage: [{
                                Name: title,
                                path: req.body.firebaseURL2,
                                // aspectRatio: {
                                //     width: dimensions2.width,
                                //     height: dimensions2.height,
                                // }


                            },
                            {
                                Name: title,
                                path: req.body.firebaseURL3,
                                // aspectRatio: {
                                //     width: dimensions3.width,
                                //     height: dimensions3.height,
                                // }


                            }
                        ],
                        keywordID: k_id
                    }],
                    artistId: _id,
                }
                var imageArtist = new imageOfArtist(artistJson);
                imageArtist.save(function (err, imageArtist) {
                    if (err) {
                        return res.status(400).send({
                            message: err
                        });
                    } else {
                        return res.json({
                            msg: "Add Artist Image",
                            data: imageArtist
                        });
                    }
                });
            } else {
                artistImage.mainImage.push({
                    title: title,
                    status: 0,
                    path: req.body.firebaseURL1,
                    subImage: [{
                            Name: title,
                            path: req.body.firebaseURL2,
                            // aspectRatio: {
                            //     width: dimensions2.width,
                            //     height: dimensions2.height,
                            // }


                        },
                        {
                            Name: title,
                            path: req.body.firebaseURL3,
                            // aspectRatio: {
                            //     width: dimensions3.width,
                            //     height: dimensions3.height,
                            // }


                        }
                    ],
                    keywordID: k_id

                });
                artistImage.save(function (err, imageArtist) {
                    if (err) {
                        return res.status(400).send({
                            message: err
                        });
                    } else {
                        return res.json({
                            msg: "Add Artist Image",
                            data: imageArtist
                        });
                    }
                });
            }
        }
    })

}

exports.findById = async (req, res, next) => {

    imageOfArtist.findOne({
        artistId: req.body._id
    }, function (err, artistImage) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            if (artistImage) {
                return res.json(
                    artistImage
                );
            } else {
                return res.json({
                    msg: "Not Found"
                });
            }
        }
    })

}


exports.deleteById = function (req, res, next) {

    imageOfArtist.deleteOne({
        artistId: req.body._id
    }, req.body, function (err, artistImage) {
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


    imageOfArtist.find({}).populate('artistId', '-hash_password').populate('mainImage.keywordID').exec(function (err, data) {
        if (err) {
            return res.json({
                message: "somgthing went wrong"
            });
        } else {
            return res.json(data);
        }
    });



};

exports.orderArtistPortfolio = async function (req, res, next) {

    const changeArtist = await imageOfArtist.find({
        artistId: req.body.id
    })
    changeArtist[0].mainImage = req.body.images
    const saveData = await changeArtist[0].save()
    return res.json(saveData);

};


exports.getById =async  function (req, res, next) {

    try{
        let data = await imageOfArtist.find({
            artistId: req.body.artistId
        }).populate("mainImage.keywordID");
        let tempMainImage = data[0].mainImage;
        for (let i = 0; i < tempMainImage.length; i++) {
            for (let j = 0; j < tempMainImage.length - i - 1; j++) {
                if (tempMainImage[j + 1].orderPortfolio < tempMainImage[j].orderPortfolio) {
                    [tempMainImage[j + 1], tempMainImage[j]] = [tempMainImage[j], tempMainImage[j + 1]]
                }
            }
        };
        data[0].mainImage = tempMainImage
        return res.json(data);
    }
    catch(err){
        return res.json(err.message);
    }
//    .exec(function (err, data) {
//         if (err) {
//             return res.json({
//                 message: "somgthing went wrong"
//             });
//         } else {

//             let tempMainImage = data[0].mainImage

//             for (let i = 0; i < tempMainImage.length; i++) {
//                 for (let j = 0; j < tempMainImage.length - i - 1; j++) {
//                     if (tempMainImage[j + 1].orderPortfolio < tempMainImage[j].orderPortfolio) {
//                         [tempMainImage[j + 1], tempMainImage[j]] = [tempMainImage[j], tempMainImage[j + 1]]
//                     }
//                 }
//             };
//             data[0].mainImage = tempMainImage
//             return res.json(data);
//         }
//     });

};


exports.getByImageId = function (req, res, next) {

    imageOfArtist.find({
        "mainImage._id": req.body._id
    }, {
        "mainImage.$": 1
    }).populate('artistId', '-hash_password').populate('mainImage.keywordID').exec(function (err, data) {
        if (err) {
            return res.json({
                message: "somgthing went wrong"
            });
        } else {
            if (data.length > 0) {
                return res.json(data[0].mainImage[0])
            } else {
                return res.json({})

            }
        }
    });

};



exports.changeStatus = async function (req, res, next) {


    try {
        await imageOfArtist.findOneAndUpdate({
            "mainImage._id": req.body._id
        }, {
            $set: {
                "mainImage.$.status": 1
            }
        })
        return res.json("successfully updated");

    } catch (err) {
        return res.json(err.message);
    }



};

exports.updateData = async function (req, res, next) {


    try {
        await imageOfArtist.findOneAndUpdate({
            "mainImage._id": req.body.mainId
        }, {
            $set: {
                "mainImage.$.title": req.body.title,
                "mainImage.$.keywordID": req.body.keyword
            }
        })
        return res.json("successfully updated");

    } catch (err) {
        return res.json(err.message);
    }



};


exports.getAllStatusOne = async function (req, res, next) {


    let data = await imageOfArtist.find({
        "mainImage.status": 1
    }).populate({
        path: 'artistId',
        select: '-hash_password',
        match: {
            status: {
                $eq: 1
            }
        }
    })
    .populate({
        path: 'mainImage.keywordID',
        match: {
            type: 1
        }
    })
    data = data.filter((item) => item.artistId !== null);
    data = data.map((item) => {
        return { mainImage:item.mainImage.filter((item1)=>(item1.keywordID.length>0)),artistId:item.artistId,_id:item._id
}})
    data = data.filter((item) => (item.mainImage.length > 0));
    // data = data.filter((item) => (item.keywordID !== null));
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {

            if (data[j + 1]?.artistId?.orderArtist < data[j]?.artistId?.orderArtist) {
                [data[j + 1], data[j]] = [data[j], data[j + 1]]
            }

        }
    };

    return res.json(data);
};

exports.getAllStatusOneKid = async function (req, res, next) {


    let data = await imageOfArtist.find({
        "mainImage.status": 1
    }).populate({
        path: 'artistId',
        select: '-hash_password',
        match: {
            status: {
                $eq: 1
            }
        }
    })
    .populate({
        path: 'mainImage.keywordID',
        match: {
            type: 2
        }
    })
    data = data.filter((item) => item.artistId !== null);
    data = data.map((item) => {
        return { mainImage:item.mainImage.filter((item1)=>(item1.keywordID.length>0)),artistId:item.artistId,_id:item._id
}})
    data = data.filter((item) => (item.mainImage.length > 0));
    // data = data.filter((item) => (item.keywordID !== null));
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {

            if (data[j + 1]?.artistId?.orderArtist < data[j]?.artistId?.orderArtist) {
                [data[j + 1], data[j]] = [data[j], data[j + 1]]
            }

        }
    };

    return res.json(data);
};






exports.getAllKeywordBased = async function (req, res, next) {
    Keyword.find({type:1}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong" + err.message);
        } else {
            let allData = await Promise.all(data.map(async (item, key) => {
                let image = await imageOfArtist.find({
                    "mainImage.status": 1,
                    "mainImage.keywordID": item._id
                }).populate({path:"mainImage.keywordID"}).limit(8).populate({path:'artistId', select:'-hash_password',match:{'status':1}});
                return {
                    Id: item._id,
                    "keyword": item.keyword,
                    "type": item.type,
                    ImageData: image
                }
            }))
            return res.json(allData);
        }
    });



};


exports.getKeywordBased = async function (req, res, next) {
    Keyword.find({type:1}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong" + err.message);
        } else {
            let image = await imageOfArtist.find({
                "mainImage.status": 1,
                "mainImage.keywordID": req.body.Id
            }).populate({path:"mainImage.keywordID"}).limit(8).populate({path:'artistId', select:'-hash_password',match:{'status':1}});
            let keywordData = await Keyword.find({
                _id: req.body.Id
            });
            return res.json({
                data: image,
                keywordData: keywordData
            });
        }
    });
};


//kidshahnon
exports.getAllKeywordBasedKid = async function (req, res, next) {
    Keyword.find({type:2}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong" + err.message);
        } else {
            let allData = await Promise.all(data.map(async (item, key) => {
                let image = await imageOfArtist.find({
                    "mainImage.status": 1,
                    "mainImage.keywordID": item._id
                }).populate({path:"mainImage.keywordID"}).limit(8).populate({path:'artistId', select:'-hash_password',match:{'status':1}});
                return {
                    Id: item._id,
                    "keyword": item.keyword,
                    "type": item.type,
                    ImageData: image
                }
            }))
            return res.json(allData);
        }
    });



};


exports.getKeywordBasedKid = async function (req, res, next) {
    Keyword.find({type:2}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong" + err.message);
        } else {
            let image = await imageOfArtist.find({
                "mainImage.status": 1,
                "mainImage.keywordID": req.body.Id
            }).populate({path:"mainImage.keywordID"}).limit(8).populate({path:'artistId', select:'-hash_password',match:{'status':1}});
            let keywordData = await Keyword.find({
                _id: req.body.Id
            });
            return res.json({
                data: image,
                keywordData: keywordData
            });
        }
    });
};