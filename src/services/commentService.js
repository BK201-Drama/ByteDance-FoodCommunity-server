const {
  MenuMapCommentTable
} = require('../models/Table');

class commentService {
  async addComment (username, Avatar, menu_id, comment) {
    const res = await MenuMapCommentTable.where({
      menu_id: menu_id
    }).findOne();

    res.comments.push({
      username: username,
      Avatar: Avatar,
      comment_content: comment
    });

    const result = await MenuMapCommentTable.save(res);
    return result;
  }

  async deleteComment (username, Avatar, menu_id, comment) {
    const res = await MenuMapCommentTable.where({
      menu_id: menu_id
    }).findOne();

    res.comments = res.comments.filter((item) => {
      const standard1 = item.username != username;
      const standard2 = item.Avatar != Avatar;
      const standard3 = item.comment_content != comment;

      return standard1 || standard2 || standard3;
    });

    const result = await MenuMapCommentTable.save(res);

    return result;
  }

  async listComment (menu_id) {
    const res = await MenuMapCommentTable.where({
      menu_id: menu_id
    }).projection({
      _id: 0,
      createdAt: 0,
      updatedAt: 0
    }).findOne();
    return res;
  }
}

module.exports = new commentService();