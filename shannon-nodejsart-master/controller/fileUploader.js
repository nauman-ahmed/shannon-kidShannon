var admin = require("firebase-admin");
const uuid = require('uuid-v4');


var serviceAccount = require("./../sanguine-drake-301215-firebase-adminsdk-2zygg-5ee276537f.json");
const bucketUrl = "sanguine-drake-301215.appspot.com";
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   storageBucket: bucketUrl
});

const bucket = admin.storage().bucket();

const uploadImage = async (req, res, next) => {
   if (!req.file) return
   const img = req.file;
   const filename = img.path;
   const file = bucket.file(filename);
   const downloadToken = uuid();
   await bucket.upload(filename, { 
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
         metadata: {
            firebaseStorageDownloadTokens: downloadToken,
         }
      }
   });

   req.body.firebaseURL = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
      splitter(filename)
    )}?alt=media&token=${downloadToken}`;


   next();
}

const splitter = (filename) => {
   let ab1 = filename.split("\\")
   let ab2 = filename.split("/")
   let result;

   if(ab1.includes('Public') && ab1.includes('protected')){
      result = ab1[filename.split("\\").length-1]
   }
   if(ab2.includes('Public') && ab2.includes('protected')){
      result = ab2[filename.split("/").length-1]
   }

   return result
}

module.exports = uploadImage;