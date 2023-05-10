const cardSchema = require('../models/card');

const VALIDATION_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;

const serverErrorMessage = 'На сервере произошла ошибка';

// Получить все карточки из БД
module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .then((cards) => res.status(200)
      .send(cards))
    .catch(next);
};

// Удалить карточки
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  cardSchema
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'Not found: Invalid _id' });
      }

      return res.status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR)
          .send({ message: 'Card with _id cannot be found' });
      } else {
        res.status(500)
          .send(serverErrorMessage);
      }
    });
};

// Создать карточку
module.exports.createCard = (req, res) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;

  cardSchema
    .create({
      name,
      link,
      owner,
    })
    .then((card) => res.status(201)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR)
          .send({ message: 'Invalid data for card creation' });
      } else {
        res.status(500)
          .send(serverErrorMessage);
      }
    });
};

// Поставить лайк
module.exports.addLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'Not found: Invalid _id' });
      }

      return res.status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR)
          .send({ message: 'Invalid data to add like' });
      }

      return res.status(INTERNAL_SERVER_ERROR)
        .send(serverErrorMessage);
    });
};

// Удалить лайк
module.exports.deleteLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'Not found: Invalid _id' });
      }

      return res.status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR)
          .send({ message: 'Invalid data to delete like' });
      }

      return res.status(INTERNAL_SERVER_ERROR)
        .send(serverErrorMessage);
    });
};
