import Router from "koa-router";
import User from "../models/User";
import Couple from "../models/Couple";
import multer from "koa-multer";
import fs from "fs";
import path from "path";
import auth from "../middleware/auth";
const first = new Router();
let check =0;
first.get("/", (ctx) => {
  console.log("http://localhost:4000");

  ctx.body = "서버온";
});

fs.readdir("src/uploads", (error) => {
  if (error) {
    fs.mkdirSync("src/uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "src/uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

first.post("/register", async (ctx) => {
  const user = await User.findOne({ email: ctx.request.body.email });
  if (user) {
    ctx.body = {
      success: false,
      message: "이미 등록된 이메일이 있습니다",
    };
  } else {
    const user = new User(ctx.request.body);
    user.save();
    ctx.body = { success: true };
  }
});

first.post("/login", async (ctx) => {
  const user = await User.findOne({ email: ctx.request.body.email });
  if (!user) {
    ctx.body = {
      loginSuccess: false,
      message: "이메일에 해당하는 유저가 없습니다",
    };
  } else {
    const isMatch = await user.comparePassword(ctx.request.body.password);
    if (!isMatch) {
      ctx.body = {
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다",
      };
    } else {
      user.generateToken(user);
      ctx.cookies.set("x_auth", user.token);
      ctx.body = { loginSuccess: true, userId: user._id };
    }
  }
});

first.post("/code", async (ctx) => {
  let randomCode = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
  console.log(randomCode);
  console.log(ctx.request.body.email);
  const code = await User.findOne({ authCode: randomCode });
  if (!code) {
    const what = await User.update(
      { email: ctx.request.body.email },
      { $set: { authCode: randomCode } },
      { upsert: true }
    );
    console.log(what);
    ctx.body = { randomCode: randomCode };
  } else {
    ctx.body = { test: "있음" };
  }
});

first.post("/lovecode", async(ctx) => {
 
  console.log(ctx.request.body.authCode2, ctx.request.body.authCode1);

console.log(check)
  if (ctx.request.body.authCode2.length == 8) {
    check++
    console.log()
    if(check==2){
      const code = await Couple.findOne({
        authCode2: ctx.request.body.authCode2,
      });
      console.log(code);

      if (!code) {
        console.log("두번")
      const couple = new Couple(ctx.request.body);
     const cck= await couple.save();
     console.log(cck)
     check=0;
      ctx.body = { success: true };
      
      }
      else{
        console.log("여긴")
        ctx.body={success:false}
      }

    }
     else{console.log("this")}
  }
});

first.post("/subinformation", upload.single("file"), async (ctx) => {
  console.log("여기만");

  console.log(ctx.req.file.filename);
  console.log("이게문제" + ctx.req.body.Email);
  console.log("이거니" + ctx.request.body.Email);
  console.log(ctx.req.body.Sex);
  const what = await User.update(
    { email: ctx.req.body.Email },
    {
      $set: {
        sex: ctx.req.body.Sex,
        username: ctx.req.body.Username,
        birth: ctx.req.body.Birth,
        firstdate: ctx.req.body.FirstDate,
        profileimage: ctx.req.file.filename,
      },
    },
    { upsert: true }
  );

  console.log(ctx.req.body.FirstDate)
  const fndcode = await User.findOne({
    email: ctx.req.body.Email,  
  });
  console.log(fndcode.authCode)
  
  const checkcc = await Couple.findOne({
    authCode1: fndcode.authCode,  
  });
  if(!checkcc){
    const gogoinser = await Couple.update(
      { authCode2: fndcode.authCode },
      {
        $set: {
          username2: ctx.req.body.Username,
          birth2: ctx.req.body.Birth,
        },
      },
      { upsert: true }
    );
  }else{
    const insertcop = await Couple.update(
      { authCode1: fndcode.authCode },
      {
        $set: {
          username1: ctx.req.body.Username,
          birth1: ctx.req.body.Birth,
          firstdate: ctx.req.body.FirstDate,
        },
      },
      { upsert: true }
    );
  }


  

  
  console.log(what);

  console.log("원본파일명 : " + ctx.req.file.originalname);
  console.log("저장파일명 : " + ctx.req.file.filename);
  console.log("크기 : " + ctx.req.file.size);

  ctx.body = {
    success: `/img/${ctx.req.file.filename}`,
  };
});

first.post("/findmypassword", async (ctx) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    ctx.body = {
      checek: false,
      text: "해당 이메일이 등록되어있지 않습니다",
    };
  } else {
    let user_email = ctx.req.body.email;
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

    ctx.body = {
      check: true,
      text: "입력하신 이메일로 인증번호가 전송되었습니다 입력해주세요",
    };
  }
});

first.post("/sendemail", async (ctx) => {
  if (ctx.req.body.checkuser == "123456") {
    ctx.body = { auth: true };
  } else {
    ctx.body = { auth: false };
  }
});

first.post("/updatepassword", async (ctx) => {
  console.log(ctx.req.body.email);
  console.log();
  const encryptedPassowrd = await bcrypt.hash(ctx.req.body.password, 10);
  User.update(
    { email: ctx.req.body.email },
    { $set: { password: encryptedPassowrd } },
    { upsert: true }
  );
  ctx.body = { success: true };
});

first.get("/auth", auth, (ctx) => {
  console.log(ctx.user);
  ctx.body = {
    _id: ctx.user._id,
    profileimage: `/uploads/${ctx.user.profileimage}`,
    authCode: ctx.user.authCode,
    firstdate: ctx.user.firstdate,
    birth: ctx.user.birth,
    username: ctx.user.username,
  };
});

first.get("/logout", auth,(ctx) => {
  console.log("지금여기"+ctx.user._id)
 User.findOneAndUpdate(
    {
      _id: ctx.user._id,
    },
    { token: "" }
  );
 
 ctx.body={success:true}
  
});

first.post("/findmylove", async (ctx) => {
  console.log(ctx.request.body);
  const code = await Couple.findOne({ authCode1: ctx.request.body.authCode });
  if (!code) {
    const code = await Couple.findOne({ authCode2: ctx.request.body.authCode });
    console.log("이거" + code.authCode2);
    ctx.body = {
      lovecode: code.authCode1,
    };
  } else {
    ctx.body = {
      lovecode: code.authCode2,
    };
  }
});

first.post("/findmypartner", async (ctx) => {
  const code = await User.findOne({ authCode: ctx.request.body.code });
  if (!code) {
    console.log("에이");
    ctx.body = { success: false };
  } else {
    ctx.body = { partnerimg: `/uploads/${code.profileimage}` };
  }
});

export default first;
