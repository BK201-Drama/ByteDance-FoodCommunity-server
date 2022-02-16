const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

router.post('/upload', upload.single('file'), wrap((req, res) => {
  res.send({
    url: `https://bk201-drama.app.cloudendpoint.cn/uploads/${req.file.filename}`
  })
}))

module.exports = router;