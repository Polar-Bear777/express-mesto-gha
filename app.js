const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { createUserValidation, loginValidation } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(express.json());

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use(router);

// Централизованная обработка ошибок
app.use(errors()); // JOI

app.use((error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

// Подключение к MongoDB
async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start()
  .then(() => console.log(`App has been successfully started!\n${MONGO_URL}\nPort: ${PORT}`));
