const columnsServices = require("../services/columnsServices.js");
const { response } = require("../helpers");

module.exports.createColumn = async (event, context, callback) => {
  console.log(event.body);
  const { title, orderId } = JSON.parse(event.body);

  try {
    const column = await columnsServices.createColumn(title, orderId);
    callback(null, response(200, column.Item));
  } catch (err) {
    console.log('This is a "create column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.getColumns = async (event, context, callback) => {
  try {
    const columns = await columnsServices.getColumns();
    callback(null, response(200, columns.Items));
  } catch (err) {
    console.log('This is a "get columns" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.getColumn = async (event, context, callback) => {
  console.log(event);
  const { column_id } = event.pathParameters;
  try {
    const column = await columnsServices.getColumn(column_id);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "get column" handler error: ', err);
    callback(null, response(err.status, err.message));
  }
};

module.exports.updateColumn = async (event, context, callback) => {
  const { column_id } = event.pathParameters;
  const { title, createdAt, orderId } = JSON.parse(event.body);
  //console.log(event);
  const paramValue = { title, orderId, createdAt };
  try {
    const column = await columnsServices.updateColumn(column_id, paramValue);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "update column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.deleteColumn = async (event, context, callback) => {
  const { column_id, orderId } = event.pathParameters;

  try {
    const column = await columnsServices.deleteColumn(column_id, orderId);
    callback(null, response(200, "Column successfully deleted"));
  } catch (err) {
    console.log('This is a "delete column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};
