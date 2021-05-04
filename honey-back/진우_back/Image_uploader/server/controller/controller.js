const UploadModel = require('../model/schema')
const fs = require('fs');


exports.home = async(req,res)=>{
    const all_images= UploadModel.find()
    res.render('../../../viewer/views/main',{images:all_images});
}

exports.uploads = (req,res,next)=>{
    const files = req.files;

    if(!files){
        const error = new Error('파일을 첨부해주세요');
        error.httpStatusCode = 400;
        return next(error)
    }

    //convert images into base64 encoding
    let imgArray = files.map((file)=>{
        let img = fs.readFileSync(file.path)

    return encode_image = img.toString('base64')   
    })

    let result = imgArray.map((src,index)=>{
        //create object to store data in the collection
        let finalImg = {
            filename:files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src
        }
        let newUpload = new UploadModel(finalImg);

        return newUpload
            .save()
            .then(()=>{
                return{msg:`${files[index].originalname} 파일의 업로드가 완료되었습니다`}
            })
            .catch(error=>{
                if(error){
                    if(error.name === 'MongoError'&&error.code===11000){
                        return Promise.reject({error:`해당 ${files[index].originalname}.File 은 이미 존재합니다`})
                    }
                    return Promise.reject({error:error.massage||`${files[index].originalname}을 업로드 할 수 없습니다`})
                }
            })
    })

    Promise.all(result)
        .then(msg=>{
            // res.json(msg);
            res.redirect('/')
        })
        .catch(err=>{
            res.json(err)
        })

}