const route = require('express').Router()
const controller = require('../controller/controller');
const store = require('../middleware/multer');

//routes
route.get('/',controller.home);
route.post('/uploadmutiple',store.array('images',12),controller.uploads)
//index.hbs 의 images 를 업로드

 module.exports=route;