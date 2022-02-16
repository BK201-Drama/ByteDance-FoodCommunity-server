const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}


router.post('/addComment', wrap(commentController.addComment));
router.post('/deleteComment', wrap(commentController.deleteComment));
router.get('/commentList', wrap(commentController.listComment));

module.exports = router;