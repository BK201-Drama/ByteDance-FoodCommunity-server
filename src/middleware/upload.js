const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.jpg');
  }
});

const upload = multer({
  storage: storage
});

module.exports = upload;