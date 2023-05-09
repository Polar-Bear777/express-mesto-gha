const userSchema = require('../models/user');

const VALIDATION_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;

// Получить всех юзеров из БД
module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Найти юзера по ID
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR)
          .send({ message: 'Bad Request' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'User with _id cannot be found' });
      }

      return res.status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

// Cоздать юзера
module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  userSchema
    .create({
      name,
      about,
      avatar,
    })
    .then((user) => res.status(201)
      .send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR)
          .send({ message: 'Invalid data to create user' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Обновить профиль
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR)
          .send({ message: 'Invalid data to create user' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Обновить аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR)
          .send({ message: 'Invalid data to create user' });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
