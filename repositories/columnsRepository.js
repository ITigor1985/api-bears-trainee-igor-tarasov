const dbquery = require("../utils/dbquery");
const uuid4 = require("uuid4");

const { checkString } = require("../helpers");
const TableName = process.env.COLUMNS_TABLE;

module.exports.createColumn = async (title, orderId) => {
  if (checkString(title)) {
    id = uuid4();

    Item = {
      column_id: id,
      createdAt: new Date().toISOString(),
      title,
      orderId,
      status: "created",
    };

    const params = {
      TableName,
      Item,
    };

    return await dbquery.createInstance(params);
  }
};

module.exports.getColumns = async () => {
  const params = {
    TableName,
  };
  return await dbquery.getAllItems(params);
};

module.exports.getColumn = async (id) => {
  const params = {
    TableName,
    Key: { column_id: id },
  };
  return await dbquery.getItem(params);
};

module.exports.updateColumn = async (
  column_id,
  { title, orderId, createdAt }
) => {
  if (checkString(title)) {
    //console.log("orderId", orderId);
    const params = {
      Key: { column_id },
      TableName,
      ConditionExpression: "attribute_exists(column_id)",
      UpdateExpression: `set title = :value, orderId = :o, createdAt=:c`,
      ExpressionAttributeValues: {
        ":value": title,
        ":o": orderId,
        ":c": createdAt,
      },
      ReturnValues: "ALL_NEW",
    };
    return await dbquery.updateItem(params);
  }
};

module.exports.deleteColumn = async (id) => {
  const params = {
    Key: {
      column_id: id,
    },
    TableName,
  };
  return await dbquery.deleteItem(params);
};
