import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChatHome.css';

const ChatHomePage = () => {
    // const socket = io.connect('http://localhost:4000/');
    // socket.on('connect', () => {
    //     const name = prompt('dd', '');

    //     if(!name) name = '익명';

    //     socket.emit('new', name);
    // });

    // socket.on('show', (data) => {
    //     console.log(data.message);
    // });

    const [roomName, setRoomName] = useState('');

    const onChangeRoom = (e) => {
        setRoomName(e.target.value);
    }

    return (
        <div className="homeContainer">
            <input 
                type="text" 
                placeholder="roomName"
                value={roomName}
                onChange={onChangeRoom}
                className="roomName"
            />
            <Link to={`/${roomName}`} className="enrtyRoom">JOIN</Link>
        </div>
    )
}

export default ChatHomePage;
