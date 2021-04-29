import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import '../styles/Chat.css';

const ChatPage = (props) => {

    const {room} = props.match.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    const socketRef = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        socketRef.current = io("http://localhost:4000", {
            query: {room},
        });
        
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

    useEffect(() => {
        scrollRef.current.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, [messages]);

    const onChaneNewMessage = (e) => {
        setNewMessage(e.target.value);
    }

    const sendMessage = (messageBody) => {
        socketRef.current.emit('newMessage', {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    }

    const onSendMessage = (e) => {
        sendMessage(newMessage);
        setNewMessage('');
    }

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
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer"  >
                <ol className="messageList" style={{overflow:"scroll"}} ref={scrollRef}>
                        {messages.map((message, i) => (
                            <li
                            ref={scrollRef}
                            key={i}
                            className={`messageItem ${
                                message.ownedByCurrentUser ? "sentMessage" : "receivedMessage"
                            }`}
                            >
                            {message.body}
                            </li>
                        ))}
                </ol>
            </div>
            <div className="noticeInputChat">
                
            </div>
            <div className="textArea">
                <textarea
                    placeholder="Text Message"
                    value={newMessage}
                    onChange={onChaneNewMessage}
                    className="textMessage"
                />
                <button onClick={onSendMessage} className="sendMessage">
                    SEND
                </button>
            </div>
        </div>
    );
}

export default ChatPage;