const mongoose = require('mongoose'),
    imageOfArtist = require('../models/imageOfArtist'),
    artistUsers = require('../models/artistModel'),
    Keyword = require('../models/keyword');

exports.getAllBipocArtistBlack = function (req, res, next) {

    artistUsers.find({type: "Black"}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong"+err.message);
        } else {
            let allData = await Promise.all(data.map(async (item,key)=>{
                let image =await imageOfArtist.find({"artistId":item._id});
                if(image.length == 0){
                    return {"artistData":item,ImageData:image}
                }
                return {"artistData":item,ImageData:image[0].mainImage}
            })) 
            return res.json(allData);        
        }  
    });  

};

exports.getAllBipocArtistAsian = function (req, res, next) {
    

    artistUsers.find({type: "Asian"}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong"+err.message);
        } else {
            let allData = await Promise.all(data.map(async (item,key)=>{
                let image =await imageOfArtist.find({"artistId":item._id});
                return {"artistData":item,ImageData:image[0].mainImage}
            }))
            return res.json(allData);
        }
    });  

};


exports.getAllBipocArtistLatino = function (req, res, next) {
    

    artistUsers.find({'type': "Latino"}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong"+err.message);
        } else {
            let allData = await Promise.all(data.map(async (item,key)=>{
                let image =await imageOfArtist.find({"artistId":item._id});
                return {"artistData":item,ImageData:image[0].mainImage}
            }))
            return res.json(allData);
        }
    });  

};


exports.getAllBipocArtistCentralAsia = function (req, res, next) {
    

    artistUsers.find({'type': "Central Asia"}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong"+err.message);
        } else {
                let allData = await Promise.all(data.map(async (item,key)=>{
                let image =await imageOfArtist.find({"artistId":item._id});
                return {"artistData":item,ImageData:image[0].mainImage}
            }))
            return res.json(allData);
        }
    });  

};


exports.getAllBipocArtistIndigenous = function (req, res, next) {
    

    artistUsers.find({'type': "Indigenous"}).exec(async function (err, data) {
        if (err) {
            return res.json("somgthing went wrong"+err.message);
        } else {
            let allData = await Promise.all(data.map(async (item,key)=>{
                let image =await imageOfArtist.find({"artistId":item._id});
                return {"artistData":item,ImageData:image[0].mainImage}
            })) 
            return res.json(allData);
        }
    });  

};

