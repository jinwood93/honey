import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import Chat from '../components/Chat';
import axios from 'axios';

const ChatContainer = ({ roomName }) => {

    const {room} = roomName;
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [notice, setNotice] = useState('');
    const [modalState, setModalState] = useState(false);
    
    // 이미지 업로드
    const [image, setImage] = useState(null);
    
    const socketRef = useRef();

    useEffect(async () => {
        // 네임스페이스
        // 네임스페이스를 연결할 때 전송되는 추가 쿼리 매개변수
        // socket.handshake.query서버 측 객체에서 발견됨
        // 서버에서 /room 을 통해 보낸 데이터만 받을 수 있음 ==> 방 구분
        socketRef.current = io("http://localhost:4000", {
            query: {room},
        });

        await socketRef.current.on('chatLists', (chatLists) => {
            setChats(chatLists);
        });
        
        socketRef.current.on('newMessage', (message) => {
            const incomingMessage = {
                ...message,
                sender: message.senderId === socketRef.current.id,
                date: message.date, 
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on('typing', (socketID) => {
            setNotice(`${socketID} 입력중...`);
        });
        socketRef.current.on('typingDone', () => {
            setNotice('');
        });

        return() => {
            socketRef.current.disconnect();
        } 
    }, [room]);

    const onChangeNewMessage = (e) => {
        setNewMessage(e.target.value);
        socketRef.current.emit('typing');
    }
    
    const onSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    }
    
    const sendMessage = (newTextMessage) => {
        const now = new Date();
        const date = now.getHours() + ':' + now.getMinutes();

        socketRef.current.emit('newText', {
            senderId: socketRef.current.id,
            textMessage: newTextMessage,
            date: date,
        });
        socketRef.current.emit('typingDone');
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onSendMessage();
        }
    }

    const openModal = () => {
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);
    }

    // 이미지업로드
    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const onSendImage = async (ctx) => {
        const formData = new FormData();

        formData.append('file', image);
        // 반환값이 Promise이기 때문에 then으로 객체를 받고 그 안의 data에 접근함
        await axios.post('/api/upload', formData)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(socketRef.current.id);

            socketRef.current.emit('newImage', {
                senderId: socketRef.current.id,
                imageMessage: res.data,
                date: Date.now(),
            });
        })
        .catch((error) => {
            console.log(error);
        })

        // console.log(image);
        // console.log(image.name);
        
        closeModal();
    }

    return (
        <>
            <Chat
                room={room}
                chats={chats}
                messages={messages}
                newMessage={newMessage}
                notice={notice}
                onChangeNewMessage={onChangeNewMessage}
                onSendMessage={onSendMessage}
                onKeyPress={onKeyPress}
                
                // 이미지 업로드
                image={image}
                onChangeImage={onChangeImage}
                onSendImage={onSendImage}

                // 모달창
                modalState={modalState} 
                openModal={openModal}
                closeModal={closeModal}
            />
        </>
    );
}

export default  withRouter(ChatContainer);
