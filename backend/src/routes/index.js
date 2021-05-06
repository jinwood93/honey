import Router from 'koa-router';
import multer from 'koa-multer';
import fs from 'fs';
import path from 'path';

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
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    })
});

api.post('/uploads', upload.single('file'), (ctx) => {
    const imageName = ctx.req.file.filename; 
   
    console.log(`멀터 ===> 파일이름 ===> ${ctx.req.file.filename}`);
    ctx.body = imageName;
});

export default api;
