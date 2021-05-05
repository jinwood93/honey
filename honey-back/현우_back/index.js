const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const port = 5000;
const server = http.createServer(app);
const io = socketIO(server);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");
const { Couple } = require("./models/Couple");
const nodemailer = require("nodemailer");
const upload = require("./fileupload");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/img", express.static("./uploads"));

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("ddd");
});
app.get("/register", (req, res) => {
  res.send("회원가입요");
});
app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.json({
        success: false,
        message: "이미 등록된 이메일이 있습니다",
      });
    } else {
      const user = new User(req.body);
      user.save((err, userinfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, userinfo });
      });
    }
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log(isMatch);
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });
      } else {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      }
    });
  });
});

app.post("/code", (req, res) => {
  let randomCode = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
  User.findOne({ authCode: randomCode }, (err, code) => {
    if (!code) {
      User.update(
        { email: req.body.email },
        { $set: { authCode: randomCode } },
        { upsert: true },
        function (err) {
          if (err) console.log(err);
          return res.json({ randomCode: randomCode });
        }
      );
    } else {
      return res.json({ test: "있음" });
    }
  });
});

app.post("/lovecode", (req, res) => {
  if (req.body.authCode2.length == 8) {
    const couple = new Couple(req.body);
    couple.save((err, coupleinfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, coupleinfo });
    });
  }
});

app.post("/subinformation", (req, res) => {
  console.log("여기만");

  upload(req, res, function (err) {
    const {
      file,
      body: { Email, Sex, Username, Birth, FirstDate },
    } = req;

    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }

    User.update(
      { email: Email },
      {
        $set: {
          sex: Sex,
          username: Username,
          birth: Birth,
          firstdate: FirstDate,
          profileimage: req.file.filename,
        },
      },
      { upsert: true },
      function (err) {
        if (err) console.log(err);
        console.log("잘들어감");
      }
    );

    console.log("원본파일명 : " + req.file.originalname);
    console.log("저장파일명 : " + req.file.filename);
    console.log("크기 : " + req.file.size);

    // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
    return res.json({
      success: `/img/${req.file.filename}`,
    });
  });
});

app.post("/findmypassword", async function (req, res) {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (!user) {
      return res.json({
        checek: false,
        text: "해당 이메일이 등록되어있지 않습니다",
      });
    } else {
      let user_email = req.body.email;
      console.log(user_email);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        prot: 587,
        host: "smtp.gmlail.com",
        secure: false,
        requireTLS: true,
        auth: {
          user: "hyeonub600@gmail.com", //gmail주소입력
          pass: "high9696!", //gmail패스워드 입력
        },
      });
      let emailcheck = 123456;
      let info = await transporter.sendMail({
        from: "hyeonub600@gmail.com.", //보내는 주소 입력
        to: user_email,
        subject: "bee이메일인증",
        text: "인증할게요",
        html: "<p>인증번호</p>" + emailcheck,
      });

      return res.json({
        check: true,
        text: "입력하신 이메일로 인증번호가 전송되었습니다 입력해주세요",
      });
    }
  });
});

app.post("/sendemail", async function (req, res) {
  if (req.body.checkuser == "123456") {
    res.json({ auth: true });
  } else {
    res.json({ auth: false });
  }
});

app.post("/updatepassword", async function (req, res) {
  console.log(req.body.email);
  console.log();
  bcrypt.hash(req.body.password, 10, (err, encryptedPassowrd) => {
    User.update(
      { email: req.body.email },
      { $set: { password: encryptedPassowrd } },
      { upsert: true },
      function (err) {
        if (err) console.log(err);
        return res.json({ success: true });
      }
    );
  });
});
app.post("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    //여러가지정보들
  });
});
app.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    }
  );
});

io.on("connection", (socket) => {
  socket.on("send code", (data2) => {
    console.log(data2);
    if (data2.select == undefined) {
      io.sockets.emit(data2.code, data2.mycode);
    } else {
      io.sockets.emit(data2.code, data2.select);
    }
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
