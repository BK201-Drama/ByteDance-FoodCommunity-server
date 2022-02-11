const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

router.post('/Listing', wrap(listController.addListing));
router.delete('/Listing', wrap(listController.cancelListing));
router.get('/Listing', wrap(listController.showListingList));
router.get('/isList', wrap(listController.isListing));

module.exports = router;