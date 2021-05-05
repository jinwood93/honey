import React, { useEffect, useRef } from 'react';
import Modal from './Modal';
import '../styles/Chat.css';

const Chat = (props) => {
    const { 
        room, chats, messages, newMessage, notice, 
        onChangeNewMessage, onSendMessage, onKeyPress, 
        modalState, openModal, closeModal, 
        image, onChangeImage, onSendImage
    } = props;
    
    const scrollRef = useRef();
    
    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [chats, messages]);

    return (
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer"  >
                <ol className="messageList"  ref={scrollRef}>
                        {chats.map((chat, i) => 
                        {
                            if(chat.messageImg) {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentId" : "receivedId"
                                            // }`}
                                        >
                                            {chat.user}
                                        </li>
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentMessage" : "receivedMessage"
                                            // }`}
                                        >
                                            <img src={`C:\\Users\\viv83\\Desktop\\2021.04.27\\react_inflearn\\server\\${chat.messageImg}`}/>
                                        </li>
                                    </div>
                                );
                            }
                            else {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentId" : "receivedId"
                                            // }`}
                                        >
                                            {chat.user}
                                        </li>
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentMessage" : "receivedMessage"
                                            // }`}
                                        >
                                            {chat.message}
                                        </li>
                                    </div>
                                );
                            }                        
                        }
                        )}
                        
                        {messages.map((message, i) => 
                        {
                            if(message.imageMessage) {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentId" : "receivedId"
                                            }`}
                                        >
                                            {message.senderId}
                                        </li>
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentMessage" : "receivedMessage"
                                            }`}
                                        >
                                            <img src={`C:\\Users\\viv83\\Desktop\\2021.04.27\\react_inflearn\\server\\${message.imageMessage}`}/>
                                        </li>
                                    </div>
                                );
                            }
                            else {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentId" : "receivedId"
                                            }`}
                                        >
                                            {message.senderId}
                                        </li>
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentMessage" : "receivedMessage"
                                            }`}
                                        >
                                            {message.textMessage}
                                            {message.date}
                                        </li>
                                    </div>
                                )
                                
                            }
                        }
                        )}
                </ol>
            </div>
            
            <Modal 
                // 이미지 업로드
                image={image}
                onChangeImage={onChangeImage}
                onSendImage={onSendImage}

                // 모달창
                modalState={modalState} 
                closeModal={closeModal} 
            />
            
            <div className="noticeInputChat">{notice}</div>
            <div className="textArea">
                <button className="imageItem" onClick={ openModal }>+</button>
                <textarea
                    placeholder="Text Message"
                    value={newMessage}
                    onChange={onChangeNewMessage}
                    onKeyPress={onKeyPress}
                    className="textMessage"
                />
                <button className="sendMessage" onClick={onSendMessage}>
                    SEND
                </button>
            </div>
        </div>
    )
}

export default Chat;
