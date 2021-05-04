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

    // const [modalState, setModalState] = useState(false);
    // const [image, setImage] = useState(null);
    
    const socketRef = useRef();
    // const scrollRef = useRef();

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
            // console.log(chatLists);
            // console.log(chats);
        });
        
        socketRef.current.on('newMessage', (message) => {
            const incomingMessage = {
                ...message,
                sender: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return() => {
            socketRef.current.disconnect();
        } 
    }, [room]);

    // useEffect(() => {
        // scrollRef.current.scrollIntoView({ 
        //     behavior: 'smooth' 
        // });
    // }, [messages]);

    const onChangeNewMessage = (e) => {
        setNewMessage(e.target.value);
    }
    
    const onSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    }
    
    const sendMessage = (newTextMessage) => {
        socketRef.current.emit('newText', {
            senderId: socketRef.current.id,
            textMessage: newTextMessage,
        });
    }

    // const onSendImage = async (newImage) => {
    //     const formData = new FormData();
    //     formData.append('file', image);
    //     const res = await axios.post('/api/upload', formData);
    //     console.log(res);

    //     // socketRef.current.emit('newImage', {
    //     //     senderId: socketRef.current.id,
    //     //     imageMessage: newImage,
    //     // });
    // }

    // const openModal = () => {
    //     setModalState(true);
    // }
    // const closeModal = () => {
    //     setModalState(false);
    // }

    // const noticeInputChat = document.querySelector(".noticeInputChat");

    // if(newMessage) socketRef.current.emit('typing');
    // else socketRef.current.emit('typingDone');

    // socketRef.current.on('typing', (socketID) => {
    //     // console.log(`타이핑중 ${noticeInputChat.innerHTML}`);
    //     noticeInputChat.innerHTML = `${socketID} 입력 중...`;
    // });
    // socketRef.current.on('typingDone', () => {
    //     // console.log(`NONONONONONONOLO ${noticeInputChat}`);
    //     noticeInputChat.innerHTML = '?';
    // });

    return (
        <>
            <Chat
                room={room}
                // scrollRef={scrollRef}
                chats={chats}
                messages={messages}
                newMessage={newMessage}
                onChangeNewMessage={onChangeNewMessage}
                onSendMessage={onSendMessage}

                // modalState={modalState}
                // openModal={openModal}
                // closeModal={closeModal}
                // onSendImage={onSendImage}
            />
        </>
    );
}

export default  withRouter(ChatContainer);
