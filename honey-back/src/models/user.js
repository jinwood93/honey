import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPw: {
        type: String,
        required: true,
    }, 
    birth: {
        type: Date,
        default: Date.now,
        required: true,
    }, 
    sex: {
        type: String,
        required: true,
    }, 
    authCode: {
        type: Number
    }, 
    // profileImage
});

// UserSchema.methods.setPassword = async function(password) {
//     const hashed = await bcrypt.hash(password, 83);
//     this.hashedPw = hashed; 
// }

UserSchema.methods.setPassword = function(password) {
    bcrypt.genSalt(18, (error, salt) => {
        if(error) {
            console.error(error);
        }
        bcrypt.hash(password, salt, (error, hash) => {
            if(error) {
                console.error(error);
            }
            this.hashedPw = hash;
        });
    });
}

export default mongoose.model('User', UserSchema);