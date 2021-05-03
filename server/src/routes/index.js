import Router from 'koa-router';

import multer from 'multer';
import fs from 'fs';
import path from 'path';

const api = new Router();
// example
// import posts from "./posts";
// api.use("/auth", auth.routes());
api.get('/', (ctx) => {
    console.log('http://localhost:4000');
    ctx.body="React && Node.js by Koa";
});

fs.readdir('uploads', (error) => {
    if(error) {
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // limits: {
    //     fileSize: 5*1024*1024
    // }
});

api.post('/upload', upload.single('image'), (ctx) => {
    console.log(ctx.request.file);
    ctx.response.toJSON({ url: `/image/${ctx.request.file.filename}`});
});

export default api;