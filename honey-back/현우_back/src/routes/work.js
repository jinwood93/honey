import Router from "koa-router";
import Photo from "../models/Photo";
import Event from "../models/Event";
import multer from "koa-multer";
import fs from "fs";
import path from "path";
const work = new Router();

work.get("/", (ctx) => {
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

work.post("/photos", upload.single("photo"), async (ctx) => {
  try {
    const photo = new Photo(req.body);
    const file = ctx.req.file.buffer;
    photo.photo = file;

    await photo.save();
    ctx.body = { _id: photo._id };
  } catch (error) {
    ctx.body = {
      upload_error: `오류가 발생하여 파일이 업로드되지 않았습니다.<br>다시 시도해주시기 바랍니다`,
    };
  }
});

work.get("/photos", async (ctx) => {
  try {
    const photos = await Photo.find({});
    ctx.body = photos;
  } catch (error) {
    ctx.body = { get_error: "파일을 불러오던 중 오류가 발생하였습니다" };
  }
});

work.get("/photos/:id", async (ctx) => {
  try {
    const result = await Photo.findById(ctx.req.params.id);
    ctx.set("Content-Type", "image/jpeg");
    ctx.body = result.photo;
  } catch (error) {
    ctx.body = { get_error: "파일을 불러오던 중 오류가 발생하였습니다" };
  }
});

work.post("/create-event", async (ctx) => {
  console.log("여기" + ctx);
  const event = new Event(ctx.req.body);
  await event.save();
  // res.sendStatus(201);
});

work.get("/get-events", async (ctx) => {
  console.log("여긴" + ctx.req.query.start);
  console.log("아니" + ctx.req.query.end);
  const events = await Event.find({
    start: { $gte: moment(ctx.req.query.start).toDate() },
    end: { $lte: moment(ctx.req.query.end).toDate() },
  });

  ctx.body = events;
});

export default work;
