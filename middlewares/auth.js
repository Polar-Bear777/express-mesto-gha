const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('You need to log in');
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'cat');
  } catch (err) {
    return next(new UnauthorizedError('You need to log in'));
  }

  req.user = payload;
  return next();
};
