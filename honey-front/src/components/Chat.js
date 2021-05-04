import React, { useCallback, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
// import Modal from './Modal';
import '../styles/Chat.css';

const Chat = (props) => {
    const { room, chats, messages, newMessage, onChangeNewMessage, onSendMessage } = props;

    
    const scrollRef = useRef();
    const { editDone } = useSelector(state => state.board);
    
    const scrollToBottom = useCallback(() => {
        if (editDone) {
          // 스크롤 내리기
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [editDone]);
    
    useEffect(() => {
        Chat();
      }, [Chat])


    return (
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer"  >
                <ol className="messageList"  ref={scrollRef}>
                {/* <ol className="messageList"> */}
                        {chats.map((chat, i) => (
                            <div
                                // ref={scrollRef}
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
                                        // ref={scrollRef}
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
                {/* <button className="imageItem" onClick={ openModal }>+</button> */}
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
