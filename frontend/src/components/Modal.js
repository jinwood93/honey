import React, { useState } from 'react';
import '../styles/Modal.css';
import axios from 'axios';

const Modal = ({ modalState, closeModal/*, onSendImage, onImgChange, image*/ }) => {

        const [image, setImage] = useState(null);
        // 이미지업로드
        const onImgChange = (e) => {
            setImage(e.target.file);
        }
    
        const onSendImage = async () => {
            const formData = new FormData();
            formData.append('file', image);
            const res = await axios.post('/api/upload', formData);
            console.log(formData);
    
            // socketRef.current.emit('newImage', {
            //     senderId: socketRef.current.id,
            //     imageMessage: newImage,
            // });
        }
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
                        value={image}
                        onChange={onImgChange}
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
