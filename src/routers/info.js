const express = require('express');
const router = express.Router();

const infoController = require('../controllers/infoController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}


router.get('/info', wrap(infoController.listInfo));
router.get('/menu', wrap(infoController.listMyMenu));
router.patch('/info', wrap(infoController.updateMyInfo));

module.exports = router;