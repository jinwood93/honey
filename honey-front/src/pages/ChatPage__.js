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
        // 네임스페이스
        // 네임스페이스를 연결할 때 전송되는 추가 쿼리 매개변수
        // socket.handshake.query서버 측 객체에서 발견됨
        // 서버에서 /room 을 통해 보낸 데이터만 받을 수 있음 ==> 방 구분
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
                {/* <input
                    type="file"
                    multiple
                    className="imageMessage"
                /> */}
                <button onClick={onSendMessage} className="sendMessage">
                    SEND
                </button>
            </div>
        </div>
    );
}

export default ChatPage;



// ////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from 'react';
// import useChat from '../useChat';
// import '../styles/Chat.css';

// const ChatPage = (props) => {

//     const {room} = props.match.params;
//     const {messages, sendMessage} = useChat(room);
//     const [newMessage, setNewMessage] = useState('');
//     const scrollRef = useRef();

//     const onChaneNewMessage = (e) => {
//         setNewMessage(e.target.value);
//     }

//     const onSendMessage = (e) => {
//         sendMessage(newMessage);
//         setNewMessage('');
//     }

//     useEffect(() => {
//         scrollRef.current.scrollIntoView({ 
//             behavior: 'smooth' 
//         });
//     }, [messages])

//     return (
//         <div className="chatContainer">
//             <h1 className="chatRoomName">{room}</h1>
//             <div className="messageContainer"  >
//                 {/* <ol>
//                     {messages.map((message) => (
//                         <li>
//                             {message.body}
//                         </li>
//                     ))}
//                 </ol> */}
//                 {/* 맨 처음 채팅방 생성될 때(데이터 없을 때) 에러 방지 */}
//                 <ol className="messageList" style={{overflow:"scroll"}} ref={scrollRef}>
//                         {messages.map((message, i) => (
//                             <li
//                             ref={scrollRef}
//                             key={i}
//                             className={`messageItem ${
//                                 message.ownedByCurrentUser ? "sentMessage" : "receivedMessage"
//                             }`}
//                             >
//                             {message.body}
//                             </li>
//                         ))}
//                 </ol>
//             </div>
//             <div className="noticeInputChat">
//                 ss
//             </div>
//             <div className="textArea">
//                 <textarea
//                     placeholder="Text Message"
//                     value={newMessage}
//                     onChange={onChaneNewMessage}
//                     className="textMessage"
//                 />
//                 <button onClick={onSendMessage} className="sendMessage">
//                     SEND
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default ChatPage;