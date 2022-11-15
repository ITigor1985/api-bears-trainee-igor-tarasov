const cardsRepository = require("../repositories/cardsRepository");

module.exports.createCard = async (title, columnId, orderId) => {
  return await cardsRepository.createCard(title, columnId, orderId);
};

module.exports.getCards = async () => {
  return await cardsRepository.getCards();
};

module.exports.getCard = async (id) => {
  return await cardsRepository.getCard(id);
};

module.exports.updateCard = async (
  card_id,
  paramColumnId,
  paramTitle,
  paramDesc,
  paramOrderId
) => {
  return await cardsRepository.updateCard(
    card_id,
    paramColumnId,
    paramTitle,
    paramDesc,
    paramOrderId
  );
};

module.exports.deleteCard = async (id) => {
  return await cardsRepository.deleteCard(id);
};
