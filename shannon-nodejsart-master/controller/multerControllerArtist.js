const multer = require('multer');

const fileStorageSystem = multer.diskStorage({
   destination:(req,file,cb)=>{
    cb(null,'./Public/protected/artistImage')
   },
   filename:(req,file,cb)=>{
      // cb(null,'temp')
      cb(null,Date.now()+'--'+file.originalname)
   },

});

module.exports = multer({storage:fileStorageSystem});
