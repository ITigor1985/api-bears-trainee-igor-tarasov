const dbquery = require("../utils/dbquery.js");
const uuid4 = require("uuid4");

const { checkString } = require("../helpers");
const TableName = process.env.CARDS_TABLE;

module.exports.createCard = async (title, column_id, orderId) => {
  if (checkString(title)) {
    const Item = {
      card_id: uuid4(),
      createdAt: new Date().toISOString(),
      title,
      column_id,
      orderId,
      description: "Description body",
    };

    const params = {
      TableName,
      Item,
    };

    return await dbquery.createInstance(params);
  }
};

module.exports.getCards = async () => {
  const params = {
    TableName,
  };

  return await dbquery.getAllItems(params);
};

module.exports.getCard = async (id) => {
  const params = {
    Key: { card_id: id },
    TableName,
  };

  return await dbquery.getItem(params);
};

module.exports.updateCard = async (
  card_id,
  paramColumnId,
  paramTitle,
  paramDesc,
  paramOrderId
) => {
  if (checkString(paramTitle) && checkString(paramDesc)) {
    const params = {
      Key: { card_id },
      TableName,
      ConditionExpression: "attribute_exists(card_id)",
      UpdateExpression: `
        set column_id = :c, title = :t, description = :d, orderId = :o
      `,
      ExpressionAttributeValues: {
        ":c": paramColumnId,
        ":t": paramTitle,
        ":d": paramDesc,
        ":o": paramOrderId,
      },
      ReturnValues: "ALL_NEW",
    };

    return await dbquery.updateItem(params);
  }
};

module.exports.deleteCard = async (id) => {
  const params = {
    Key: { card_id: id },
    TableName,
  };

  return await dbquery.deleteItem(params);
};
