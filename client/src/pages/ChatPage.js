import React, { useEffect, useRef, useState } from 'react';
import useChat from '../useChat';
import '../styles/Chat.css';

const ChatPage = (props) => {

    const {room} = props.match.params;
    const {messages, sendMessage} = useChat(room);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();

    const onChaneNewMessage = (e) => {
        setNewMessage(e.target.value);
    }

    const onSendMessage = (e) => {
        sendMessage(newMessage);
        setNewMessage('');
    }

    useEffect(() => {
        scrollRef.current.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, [messages])

    return (
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer"  >
                {/* <ol>
                    {messages.map((message) => (
                        <li>
                            {message.body}
                        </li>
                    ))}
                </ol> */}
                {/* 맨 처음 채팅방 생성될 때(데이터 없을 때) 에러 방지 */}
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
                ss
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