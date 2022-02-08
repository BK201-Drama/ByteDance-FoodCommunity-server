// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/api');

// 使用轻服务 todo 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const todoTable = inspirecloud.db.table('todo');

const UserTable = inspirecloud.db.table('User');
const InfoTable = inspirecloud.db.table('Info');
const AboutConcernTable = inspirecloud.db.table('AboutConcern');
const MenuTable = inspirecloud.db.table('Menu');
const MenuMapCommentTable = inspirecloud.db.table('MenuMapComment');
const MenuLabelTable = inspirecloud.db.table('MenuLabel');
const CookingWorksTable = inspirecloud.db.table('CookingWorks');
const CookingWorkMapUserTable = inspirecloud.db.table('CookingWorkMapUser');
const ListingTable = inspirecloud.db.table('Listing');

// 导出 table 实例

module.exports = {
  todoTable,
  UserTable,
  InfoTable,
  AboutConcernTable,
  MenuTable,
  MenuMapCommentTable,
  MenuLabelTable,
  CookingWorksTable,
  CookingWorkMapUserTable,
  ListingTable
};
