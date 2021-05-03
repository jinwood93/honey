import React from 'react';
import Modal from './Modal';
import '../styles/Chat.css';

const Chat = (props) => {
    const { room, scrollRef, messages, newMessage, onChangeNewMessage, onSendMessage } = props;
    
    return (
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer"  >
                <ol className="messageList"  ref={scrollRef}>
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
            
            {/* <Modal modalState={ modalState } closeModal={ closeModal } onSendImage={onSendImage}/> */}

            <div className="noticeInputChat"/>
            <div className="textArea">
                <button className="imageItem" onClick={ openModal }>+</button>
                <textarea
                    placeholder="Text Message"
                    value={newMessage}
                    onChange={onChangeNewMessage}
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
