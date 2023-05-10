const router = require('express').Router();

const serverErrorMessage = 'На сервере произошла ошибка';

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => {
  res.status(404).send(serverErrorMessage);
});

module.exports = router;
