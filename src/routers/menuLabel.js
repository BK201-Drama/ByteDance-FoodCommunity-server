const express = require('express');
const router = express.Router();

const menuLabelController = require('../controllers/menuLabelController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}


router.get('/tagList', wrap(menuLabelController.listAllLabel));

module.exports = router;