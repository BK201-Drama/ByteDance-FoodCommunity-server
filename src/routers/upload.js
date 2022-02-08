const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

router.post('/upload', upload.single('file'), (req, res) => {
  res.send({
    url: `https://bk201-drama.app.cloudendpoint.cn/uploads/${req.file.filename}`
  })
})

module.exports = router;