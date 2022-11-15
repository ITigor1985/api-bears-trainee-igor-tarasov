const cardsServices = require("../services/cardsServices");
const { response } = require("../helpers");

module.exports.createCard = async (event, context, callback) => {
  const { title, column_id, orderId } = JSON.parse(event.body);

  try {
    const card = await cardsServices.createCard(title, column_id, orderId);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "create card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.getCards = async (event, context, callback) => {
  try {
    const cards = await cardsServices.getCards();
    callback(null, response(200, cards.Items));
  } catch (err) {
    console.log('This is a "get cards" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.getCard = async (event, context, callback) => {
  const { card_id } = event.pathParameters;

  try {
    const card = await cardsServices.getCard(card_id);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "get card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.updateCard = async (event, context, callback) => {
  const { card_id } = event.pathParameters;
  const { paramColumnId, paramTitle, paramDesc, paramOrderId } = JSON.parse(
    event.body
  );

  try {
    const card = await cardsServices.updateCard(
      card_id,
      paramColumnId,
      paramTitle,
      paramDesc,
      paramOrderId
    );
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is an "update card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};

module.exports.deleteCard = async (event, context, callback) => {
  const { card_id } = event.pathParameters;

  try {
    const card = await cardsServices.deleteCard(card_id);
    callback(null, response(200, "Card successfully deleted"));
  } catch (err) {
    console.log('This is a "delete card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  }
};
