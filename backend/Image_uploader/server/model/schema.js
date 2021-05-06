const mogoosse = require('mongoose');

const uploadSchema = new mogoosse.Schema({
    filename:{
        type:String,
        unique:true,
        required:true,
    },
    contentType:{
        type:String,
        required:true
    },
    imageBase64:{
        type:String,
        required:true
    }
})

module.exports = UploadModel = mongoose.model('uploads',uploadSchema);