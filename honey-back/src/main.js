require("dotenv").config();

import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";

const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { 
        useNewUrlParser: true, 
        useFindAndModify: false 
        }
    )
    .then(() => {
        console.log("몽고디비를 시작해볼까...");
    })
    .catch((error) => {
        console.error(error);
    });

const app = new Koa();
const router = new Router();

//라우터 적용전에 bodyparser적용
app.use(bodyParser());
//app instance에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log("서버 시작... %d 포트", port);
});
