const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

router.post('/login', wrap(loginController.login));
router.post('/sign', wrap(loginController.sign));
router.post('/updatePwd', wrap(loginController.updatePassword));
router.get('/getAvatar', wrap(loginController.Avatar));

module.exports = router;