const path = require('path');
const todoRouter = require('./routers/todo');

const uploadRouter = require('./routers/upload');
const loginRouter = require('./routers/login');
const infoRouter = require('./routers/info');
const aboutConcernRouter = require('./routers/aboutConcern');
const menuRouter = require('./routers/menu');
const menuLabelRouter = require('./routers/menuLabel');
const listRouter = require('./routers/listing');
const CommentRouter = require('./routers/comment');

const express = require('express');

const app = express();

// 为应用使用中间件
// 静态文件中间件
app.use(express.static(path.join(__dirname, '../public')));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(express.json());

// 为应用使用路由定义
// 待办事项业务路由
app.use('/api/todo', todoRouter);

app.use('/api', uploadRouter);
app.use('/api', loginRouter);
app.use('/api', infoRouter);
app.use('/api', aboutConcernRouter);
app.use('/api', menuRouter);
app.use('/api', menuLabelRouter);
app.use('/api', listRouter);
app.use('/api', CommentRouter);

// 若无匹配业务路由，则匹配 404 路由，代表访问路径不存在
app.use(notFound);
/** 若前面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(errorHandler);

function notFound(req, res) {
  res.status(404);
  res.send({
    error: 'not found'
  });
}

function errorHandler(err, req, res, next) {
  // 抛出的错误可以附带 status 字段，代表 http 状态码
  // 若没有提供，则默认状态码为 500，代表服务器内部错误
  res.status(err.status || 500);
  res.send({error: err.message});
}
// 导出 Express 对象
module.exports = app;
