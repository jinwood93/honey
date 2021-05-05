import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const userSchema  = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    default: Date.now,
  },
  firstdate: {
    type: Date,
    default: Date.now,
  },
  sex: {
    type: String,
  },
  authCode: {
    type: Number,
  },
  profileimage: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainpassword, cb) {
  console.log(this.password);
  bcrypt.compare(plainpassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    else {
      cb(null, isMatch);
    }
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    console.log("thisis"+decoded)
    user.findOne({"_id": decoded, "token": token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
export default  User;
