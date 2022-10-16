var admin = require("firebase-admin");
const uuid = require('uuid-v4');


var serviceAccount = require("./../sanguine-drake-301215-firebase-adminsdk-2zygg-5ee276537f.json");
const bucketUrl = "sanguine-drake-301215.appspot.com";
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   storageBucket: bucketUrl
},'diffApp');

const bucket = admin.storage().bucket();

const uploadImage = async (req, res, next) => {
   if (!req.files) return

   if(req.body.EDIT == 'True'){
      const img2 = req.files[0];
      const img3 = req.files[1];
      const filename2 = img2.path;
      const filename3 = img3.path;
      const downloadToken2 = uuid();
      const downloadToken3 = uuid();
      await bucket.upload(filename2, {
         gzip: true,
         metadata: {
            metadata: {
               firebaseStorageDownloadTokens: downloadToken2,
            }
         }
      });
      
      await bucket.upload(filename3, {
      gzip: true,
      metadata: {
            metadata: {
               firebaseStorageDownloadTokens: downloadToken3,
            }
         }
      });
   
      // ///////////////////////// FOR DEVELOPMENT ////////////////////////////////////////////////////
   
       req.body.firebaseURL2 = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
         splitter(filename2)
       )}?alt=media&token=${downloadToken2}`;
       req.body.firebaseURL3 = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
         splitter(filename3)
       )}?alt=media&token=${downloadToken3}`;

      }else{
         const img1 = req.files[0];
         const img2 = req.files[1];
         const img3 = req.files[2];
         const filename1 = img1.path;
         const filename2 = img2.path;
         const filename3 = img3.path;
         const downloadToken1 = uuid();
         const downloadToken2 = uuid();
         const downloadToken3 = uuid();
         await bucket.upload(filename1, {
            gzip: true,
            metadata: {
               metadata: {
                  firebaseStorageDownloadTokens: downloadToken1,
               }
            }
         });
         
         await bucket.upload(filename2, {
         gzip: true,
         metadata: {
               metadata: {
                  firebaseStorageDownloadTokens: downloadToken2,
               }
            }
         });
         await bucket.upload(filename3, {
            gzip: true,
            metadata: {
               metadata: {
                  firebaseStorageDownloadTokens: downloadToken3,
               } 
            }
         }); 
      
         ///////////////////////// FOR DEVELOPMENT ////////////////////////////////////////////////////
      
         req.body.firebaseURL1 = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
            splitter(filename1)
         )}?alt=media&token=${downloadToken1}`;
          req.body.firebaseURL2 = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
            splitter(filename2)
          )}?alt=media&token=${downloadToken2}`;
          req.body.firebaseURL3 = `https://firebasestorage.googleapis.com/v0/b/${bucketUrl}/o/${encodeURIComponent(
            splitter(filename3)
          )}?alt=media&token=${downloadToken3}`;
      
      }
   
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