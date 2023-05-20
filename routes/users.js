const usersRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  updateUserValidation,
  validationUpdateAvatar,
  userIdValidation,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', userIdValidation, getUserById);
usersRouter.patch('/me', updateUserValidation, updateProfile);
usersRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = usersRouter;
