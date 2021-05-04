const router = require("express").Router();
const Event = require("../Models/Event");
const moment = require("moment");

router.post("/create-event", async(req,res)=>{
    const event = new Event(req.body);
    await event.save((err,data)=>{
        if(err) console.log(err);
    });
    // res.sendStatus(201);
})

router.get("/get-events",async(req,res)=>{
    const events = await Event.find({
        start: {$gte: moment(req.query.start).toDate()},
        end: {$lte: moment(req.query.end).toDate()},
    });

    res.send(events);
});

module.exports = router;