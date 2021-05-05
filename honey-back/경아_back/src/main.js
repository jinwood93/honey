// .env 파일에서 환경변수 불러옴
require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import http from 'http';
import socket from 'socket.io';
import mongoose from 'mongoose';
import api from './routes/index';
import Chatting from './models/chat';

// import cors from 'cors';

const { PORT, MONGO_URI, NODE_ENV } = process.env;

// 개발 환경일 때만 몽구스가 생성하는 쿼리 내용을 콘솔에서 확인 가능
const connect = () => {
    if(NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
}

mongoose.connect(MONGO_URI, {
    dbName: "Honey",
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
        .then(() => console.log("몽고디비를 연결해볼가..."))
        .catch((error) => console.error(error)); 

const port = PORT || 4000;
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

// server 연결
router.use('/api', api.routes());

// app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

server.listen(port, () => {
    console.log(`서버 시작... ${port}번 포트`);
});

// socket.io 문법
io.on('connection', async (socket) => {
    const {room} = socket.handshake.query;
    socket.join(room);

    console.log(`소켓 연결 ${socket.id}`);
    console.log(`입장 ${room}으로 입장`);

    const chatLists = await Chatting.find({ room: room }).sort('messageDate');
    // console.log(chatLists[0].user, chatLists[0].message);
    console.log("=======================================");
    // console.log(chatLists);

    socket.emit('chatLists', chatLists);

    // 실시간 입력
    socket.on('typing', () => {
        // socket.to(room).emit('typing', socket.id);
        socket.broadcast.emit('typing', socket.id);
    });
    socket.on('typingDone', () => {
        // socket.to(room).emit('typingDone');
        socket.broadcast.emit('typingDone');
    });

    // 클라이언트로 이벤트 발생
    socket.on('newText', (data) => {
        // 일반 텍스트
        io.in(room).emit('newMessage', data);
        console.log(`텍스트 데이터 ==> ${data.senderId} : ${data.textMessage}`);

        const chatting = new Chatting({
            room: room,        
            user: data.senderId,
            message: data.textMessage,
        });
        chatting.save();
    });

    socket.on('newImage', (data) => {
        // 사진 파일
        io.in(room).emit('newMessage', data);

        const chatting = new Chatting({
            room: room,        
            user: data.senderId,
            messageImg: data.imageMessage,
        });
        chatting.save();
    });

    socket.on('disconnect', () => {
        socket.leave(room);
        console.log("소켓 연결 해제");
    });
});
