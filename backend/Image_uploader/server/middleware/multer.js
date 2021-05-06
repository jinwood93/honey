const multer = require('multer');

//set storage
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        //image.jpg (이미지에 유니크와 같은 의미를 부여하여 중복이름 불가)
        
        cb(null,file.fieldname+'-'+Date.now()+ext)
    }
})

module.exports = store = multer({storage:storage})