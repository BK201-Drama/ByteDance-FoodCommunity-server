const express = require('express');
const aboutConcernController = require('../controllers/aboutConcernController');
const router = express.Router();

const aboutConcernController = require('../controllers/aboutConcernController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

router.get('/concern', wrap(aboutConcernController.listConcern));
router.get('/concerned', wrap(aboutConcernController.listConcerned));
router.patch('/addConcern', wrap(aboutConcernController.addConcern));
router.patch('/cancelConcern', wrap(aboutConcernController.cancelConcern));
router.patch('/isConcern', wrap(aboutConcernController.isConcern));

module.exports = router;