const commentService = require('../services/commentService');

class commentController {
  async addComment (req, res) {
    const {
      username, Avatar, menu_id, comment
    } = req.body;

    const result = await commentService.addComment(username, Avatar, menu_id, comment);
    res.send(result);
  }

  async deleteComment (req, res) {
    const {
      username, Avatar, menu_id, comment
    } = req.body;

    const result = await commentService.deleteComment(username, Avatar, menu_id, comment);
    res.send(result);
  }

  async listComment (req, res) {
    const {menu_id} = req.query;
    const result = await commentService.listComment(menu_id);
    res.send(result);
  }
}

module.exports = new commentController();