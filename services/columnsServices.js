const columnsRepository = require("../repositories/columnsRepository");

module.exports.createColumn = async (title, orderId) => {
  return await columnsRepository.createColumn(title, orderId);
};

module.exports.getColumns = async () => {
  return await columnsRepository.getColumns();
};

module.exports.getColumn = async (id) => {
  return await columnsRepository.getColumn(id);
};

module.exports.updateColumn = async (column_id, paramValue) => {
  return await columnsRepository.updateColumn(column_id, paramValue);
};

module.exports.deleteColumn = async (id) => {
  return await columnsRepository.deleteColumn(id);
};
