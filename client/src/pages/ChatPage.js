import React, { useState } from 'react';
import useChat from '../useChat';
import '../styles/Chat.css';

const ChatPage = (props) => {
    const {room} = props.match.params;
    const {messages, sendMessage} = useChat(room);
    const [newMessage, setNewMessage] = useState('');

    const onChaneNewMessage = (e) => {
        setNewMessage(e.target.value);
    }

    const onSendMessage = (e) => {
        sendMessage(newMessage);
        setNewMessage('');
    }

    return (
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer">
                {/* <ol>
                    {messages.map((message) => (
                        <li>
                            {message.body}
                        </li>
                    ))}
                </ol> */}
                <ol className="messageList">
                    {messages.map((message, i) => (
                        <li
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
