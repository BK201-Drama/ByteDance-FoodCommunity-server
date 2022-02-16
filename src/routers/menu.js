const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuController');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

router.post('/addMenu', wrap(menuController.addMenu));
router.post('/deleteMenu', wrap(menuController.deleteMenu));
router.post('/updateMenu', wrap(menuController.updateMenu));
router.post('/like', wrap(menuController.likeMenu));
router.get('/menu/:menu_id', wrap(menuController.showMenu));
router.get('/menuList', wrap(menuController.listAllMenu));
router.get('/menuTagList', wrap(menuController.listMenuByTag));
router.get('/avatar', wrap(menuController.avatar));
router.post('/searchMenu', wrap(menuController.searchMenu));

module.exports = router;