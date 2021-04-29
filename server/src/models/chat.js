import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
    // user: {
    //     _id: mongoose.Types.ObjectId,
    //     username: String,
    // }
    room: String,
    user: String,
    message: String,
    messageDate: {
        type: Date,
        default: Date.now,
    },
});

const ChatDB = mongoose.model('ChatDB', ChatSchema);
export default ChatDB;