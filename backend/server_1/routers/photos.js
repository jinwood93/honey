const express = require('express');
const multer = require('multer');
const Photo = require('../model/Photo');
const Router = express.Router();

const upload = multer({
  limits: {
    fileSize: 5000000 // 파일 최대 크기 5MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error('jpg 와 jpeg 파일만 업로드가 가능합니다'));
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/photos',
  upload.single('photo'),
  async (req, res) => {
    try {
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;

      await photo.save();
      res.status(201).send({ _id: photo._id });
    } catch (error) {
      res.status(500).send({
        upload_error: `오류가 발생하여 파일이 업로드되지 않았습니다.<br>다시 시도해주시기 바랍니다`
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

Router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).send({ get_error: '파일을 불러오던 중 오류가 발생하였습니다' });
  }
});

Router.get('/photos/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: '파일을 불러오던 중 오류가 발생하였습니다' });
  }
});

module.exports = Router;
