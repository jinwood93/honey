import React, { useEffect, useRef } from 'react';
import Modal from './Modal';
import '../styles/Chat.css';

const Chat = (props) => {
    const { 
        room, chats, messages, newMessage, notice, 
        onChangeNewMessage, onSendMessage, onKeyPress, 
        modalState, openModal, closeModal, 
        onSendImage, onImgChange, image
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
                        {chats.map((chat, i) => (
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
                        ))}
                        
                        {messages.map((message, i) => 
                        // {
                        //     if(message.imageMessage) {
                        //         return(
                        //             <div
                        //                 ref={scrollRef}
                        //                 key={i}
                        //             >
                        //                 <li
                        //                     className={`messageItem ${
                        //                         message.sender ? "sentId" : "receivedId"
                        //                     }`}
                        //                 >
                        //                     {message.senderId}
                        //                 </li>
                        //                 <li
                        //                     className={`messageItem ${
                        //                         message.sender ? "sentMessage" : "receivedMessage"
                        //                     }`}
                        //                 >
                        //                     <img src=""/>
                        //                 </li>
                        //             </div>
                        //         );
                        //     }
                        //     else {return
                                (
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
                                        </li>
                                    </div>
                                )
                        //     }
                        // }
                        )}
                </ol>
            </div>
            
            <Modal 
                modalState={modalState} 
                closeModal={closeModal} 

                // onSendImage={onSendImage}
                // onImgChange={onImgChange}
                // image={image}
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
