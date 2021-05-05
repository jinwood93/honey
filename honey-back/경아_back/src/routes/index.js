import Router from 'koa-router';
import multer from 'koa-multer';
import fs from 'fs';

const api = new Router();

api.get('/', (ctx) => {
    console.log('http://localhost:4000');
    ctx.body="React && Node.js by Koa";
});

fs.readdir('src/uploads', (error) => {
    if(error) {
        fs.mkdirSync('src/uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'src/uploads/');
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        },
    })
});

api.post('/upload', upload.single('file'), (ctx) => {
    // const imageName = ctx.req.file.filename; 
    const imageName = ctx.req.file.path; 
    
    ctx.body = imageName;
    console.log(`멀터 ===> 파일이름 ===> ${ctx.req.file.filename}`);
});

export default api;
