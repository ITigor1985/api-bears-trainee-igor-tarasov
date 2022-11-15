const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const { ErrorHandler } = require("../helpers");

module.exports.createInstance = (params) => {
  try {
    db.put(params).promise();
    return params;
  } catch (err) {
    console.log("Сreate:", err);
    throw new ErrorHandler(
      `Failed to create a new record in ${params.TableName}`,
      400
    );
  }
};

module.exports.getAllItems = (params) => {
  try {
    return db.scan(params).promise();
  } catch (err) {
    console.log("Get all:", err);
    throw new ErrorHandler(`Failed to scan ${params.TableName}`, 400);
  }
};

module.exports.getItem = async (params) => {
  try {
    return db.get(params).promise();
  } catch (err) {
    console.log("Get one:", err);
    throw new ErrorHandler(
      `Faild to get an item from the ${params.TableName}`,
      400
    );
  }
};

module.exports.updateItem = (params) => {
  try {
    return db.update(params).promise();
  } catch (err) {
    console.log("Update:", err);
    throw new ErrorHandler(
      `Failed to update item in the ${params.TableName}`,
      400
    );
  }
};



module.exports.deleteItem = (params) => {
  try {
    return db.delete(params).promise();
  } catch (err) {
    console.log("Delete:", err);
    throw new ErrorHandler(
      `Failed to delete item from the ${params.TableName}`,
      400
    );
  }
};
