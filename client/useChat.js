import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const useChat = (room) => {
    // const [messages, setMessages] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    
    useEffect(() => {
        // const socket = io.connect(`http://localhost:4000/${room}`);

        // socket connetcion
        socketRef.current = io("http://localhost:4000", {
            query: {room},
        });

        // 서버에서 발생한 이벤트 수행
        // socketRef.current.on('newMessage', (message) => {
        //     setMessages(messages);
        // });
        socketRef.current.on('newMessage', (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return() => {
            socketRef.current.disconnect();
        } 
    }, [room]);

    const sendMessage = (messageBody) => {
        // 서버측으로 이벤트 발생
        socketRef.current.emit('newMessage', {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    }

    return {messages, sendMessage}
}

export default useChat;
