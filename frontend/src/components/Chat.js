import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import Modal from './Modal';
import '../styles/Chat.css';

const Chat = (props) => {
    const { 
        room, chats, messages, newMessage, notice, 
        onChangeNewMessage, onSendMessage, onKeyPress, 
        modalState, openModal, closeModal, 
        image, onChangeImage, onSendImage,
    } = props;
    
    const scrollRef = useRef();
    if(modalState) 
    const modal = modalState;
    console.log(modal);
    console.log(modalState);
    
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
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentId" : "receivedId"
                                            // }`}
                                        >
                                            {chat.user}
                                        </div>
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentDate" : "receivedDate"
                                            // }`}
                                        >
                                            {moment(chat.messageDate).format('LT')}
                                        </li>
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentMessage" : "receivedMessage"
                                            // }`}
                                        >
                                            <img src={`/uploads/${chat.messageImg}`} style={{width: '100%', height: '100%'}}/>
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
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentId" : "receivedId"
                                            // }`}
                                        >
                                            {chat.user}
                                        </div>
                                        <li
                                            // className={`messageItem ${
                                            //     message.sender ? "sentDate" : "receivedDate"
                                            // }`}
                                        >
                                            {moment(chat.messageDate).format('LT')}
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
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentId" : "receivedId"
                                            }`}
                                        >
                                            {message.senderId}
                                        </div>
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentDate" : "receivedDate"
                                            }`}
                                        >
                                            {moment(message.date).format('LT')}
                                        </li>
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentMessage" : "receivedMessage"
                                            }`}
                                        >
                                            <img src={`/uploads/${message.imageMessage}`} style={{width: '100%', height: '100%'}}/>
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
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentId" : "receivedId"
                                            }`}
                                        >
                                            {message.senderId}
                                        </div>
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentDate" : "receivedDate"
                                            }`}
                                        >
                                            {moment(message.date).format('LT')}
                                        </li>
                                        <li
                                            className={`messageItem ${
                                                message.sender ? "sentMessage" : "receivedMessage"
                                            }`}
                                        >
                                            {message.textMessage}
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
                {/* <fieldset {`messageItem ${modalState? 'disabled' : ''}`}> */}
                <fieldset {`${modal}`? 
            (
                    <button className="sendImage" onClick={onSendImage}>
                        SEND
                    </button>)
            : null}>
                    <button className="imageItem" onClick={openModal}>+</button>
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
                </fieldset>
            </div>
        </div>
    )
}

export default Chat;
