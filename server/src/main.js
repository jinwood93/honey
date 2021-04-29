// .env 파일에서 환경변수 불러옴
require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import http from 'http';
import socket from 'socket.io';
import mongoose from 'mongoose';

import ChatDB from './models/chat';

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => console.log("몽고디비를 연결해볼가..."))
        .catch((error) => console.error(error)); 

const port = process.env.PORT || 4000;
const app = new Koa();
const router = new Router();

// http 모듈로 서버 생성 ==> server instance
const server = http.createServer(app.callback());
// socket 생성 후 서버 인스턴스 사용
// 서버에 웹 소켓을 할당
const io = socket(server, {
    cors: {
        origin: "*",
    }
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

server.listen(port, () => {
    console.log(`서버 시작... ${port}번 포트`);
});

// socket.io 문법
io.on('connection', (socket) => {
    const {room} = socket.handshake.query;
    socket.join(room);

    console.log(`소켓 연결 ${socket.id}`);
    console.log(`입장 ${room}으로 입장`);

    socket.on('typing', () => {
        // socket.to(room).emit('typing', socket.id);
        socket.broadcast.emit('typing', socket.id);
    });
    socket.on('typingDone', () => {
        // socket.to(room).emit('typingDone');
        socket.broadcast.emit('typingDone');
    });

    // 클라이언트로 이벤트 발생
    socket.on('newMessage', (data) => {
        // 여기서 디비에 저장
        io.in(room).emit('newMessage', data);

        console.log(`${data.senderId} : ${data.body}`);

        const chatDb = new ChatDB({
            room: room,        
            user: data.senderId,
            message: data.body,
        });
        chatDb.save();
    });

    socket.on('disconnect', () => {
        socket.leave(room);
        console.log("소켓 연결 해제");
    });
});