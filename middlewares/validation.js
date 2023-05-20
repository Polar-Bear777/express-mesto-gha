const { Joi, celebrate } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

// URL
const urlValidation = (url) => {
  if (isUrl(url)) return url;
  throw new BadRequestError('Incorrect URL');
};

// ID
const IdValidation = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) return id;
  throw new BadRequestError('Incorrect id');
};

// Валидация юхера при создании
module.exports.createUserValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      avatar: Joi.string()
        .custom(urlValidation),
      password: Joi.string()
        .required(),
    }),
});

// Валидация идентиф. карты
module.exports.cardByIdValidation = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom(IdValidation),
    }),
});

// Валидация логина
module.exports.loginValidation = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

// Валидация обновления аватара
module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .custom(urlValidation),
    }),
});

// Валидация обновления юзера
module.exports.updateUserValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      about: Joi.string()
        .min(2)
        .max(30)
        .required(),
    }),
});

// Валидация создания карты
module.exports.createCardValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      link: Joi.string()
        .required()
        .custom(urlValidation),
    }),
});

// Валидация идентиф. юзера
module.exports.userIdValidation = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .custom(IdValidation),
    }),
});
