import Router from 'koa-router';
import multer from 'multer';
import fs from 'fs';

const api = new Router();

api.get('/', (ctx) => {
    console.log('http://localhost:4000');
    ctx.body="React && Node.js by Koa";
});

fs.readdir('uploads', (error) => {
    if(error) {
        fs.mkdirSync('uploads');
    }
});

// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'uploads/');
//         },
//         filename(req, file, cb) {
//             cb(null, file.fiename + '_' + Date.now());
//         },
//     }),
//     // limits: {
//     //     fileSize: 5*1024*1024
//     // }
// });


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        //image.jpg (이미지에 유니크와 같은 의미를 부여하여 중복이름 불가)

        cb(null,file.fieldname+'_'+Date.now()+ext)
    }
})
const store = multer({storage:storage})

api.post('/upload', store.single('image'), () => {
    console.log("aaaaaaaa");
})

// api.post('/upload', upload.single('image'), (ctx, next) => {
//     console.log('=============업로드=====>'+ctx.body.request.file);
//     // ctx.response.toJSON({ url: `/image/${ctx.request.file.filename}`});
// });

export default api;


// router.post(
//     '/post',
//     koaBody({
//       multipart: true,
//     }),), // koaBody를 사용해서 multipart데이터를 허용한다고 설정해준다.
//     (ctx: Context) => {
//       const { title, body } = ctx.request.body; // formdata의 기본적인 text필드들은 ctx.request.body에 값이 들어오고
//       const file = ctx.request.files.files; // file형식은 ctx.request.files에 들어온다. ctx.request.files.[files] 여기서 마지막 files는 내가 키값으로 설정해준 값이다. ex) new form().append('files', ~) 와 같이 키 값을 줬기 때문에 위와같이 접근한것이다.
//       let files = [];
//       for (let i = 0; i < file.length; i++)
//         files.push(fs.readFileSync(file[i].path)); // 나는 file들을 formdata로 읽어와 buffer로 데이터베이스에 저장했다.
    