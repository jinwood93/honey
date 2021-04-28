// .env 파일에서 환경변수 불러옴
require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import http from 'http';
import socket from 'socket.io';


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
    },
});


app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());


server.listen(port, () => {
    console.log(`서버 시작... ${port}번 포트`);
});


// socket.io 문법
io.on('connection', (socket) => {
    console.log(`소켓 연결 ${socket.id}`);

    const {room} = socket.handshake.query;
    socket.join(room);
    console.log(`입장 ${room}으로 입장`);

    // 클라이언트로 이벤트 발생
    socket.on('newMessage', (data) => {
        // io.in(room).emit('newMessage', data.body);
        io.in(room).emit('newMessage', data);
    });

    // socket.on('send', (data) => {
    //     console.log(`전달된 메세지 ${data.massege}`);
    // });

    // socket.on('new', (name) => {
    //     console.log(`전달된 메세지 ${name}`);
    //     io.socket.emit('show', {message: `${name} 님이 접속`});
    // });

    socket.on('disconnect', () => {
        socket.leave(room);
        console.log("소켓 연결 해제");
    });
});
