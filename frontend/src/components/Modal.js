import React, { useState } from 'react';
import '../styles/Modal.css';
import axios from 'axios';

const Modal = ({ modalState, closeModal, image, onChangeImage, onSendImage }) => {

    // const [image, setImage] = useState(null);

    // const onChangeImage = (e) => {
    //     setImage(e.target.files[0]);
    // }

    // const onSendImage = async () => {
    //     const formData = new FormData();

    //     formData.append('file', image);
    //     await axios.post('/api/upload', formData);

    //     // socketRef.current.emit('newImage', {
    //     //     senderId: socketRef.current.id,
    //     //     imageMessage: newImage,
    //     // });
        
    //     closeModal();
    // }

    return (
        <div className={ modalState? 'openModal' : 'nomodal'}>
            { modalState? 
            (<div className="modalContainer">
                <div className="modalTop">
                    <button className="close" onClick={closeModal}>
                        X
                    </button>
                </div>
                <div className="modalMiddle">
                    <input
                        type="file"
                        // value={image}
                        onChange={onChangeImage}
                        accept=".png, .jpg, .jpeg, .gif"
                        className="imageMessage"
                    />
                </div>
                <div className="modalBttom">
                    <button className="sendImage" onClick={onSendImage}>
                        SEND
                    </button>
                </div>
            </div>)
            : null }
        </div>
    );
}

export default Modal;
