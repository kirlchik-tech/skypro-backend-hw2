import User from '../models/user.js';

// Получить всех
const getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.json(users))
    .catch(next); // Передаем ошибку в глобальный обработчик
};

// Получить по ID
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      // Если запрос прошел, но юзера с таким ID нет в базе
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        return next(err);
      }
      res.json(user);
    })
    .catch(err => {
      // Если не формат Mongo
      if (err.name === 'CastError') {
        const customErr = new Error('Некорректный ID');
        customErr.statusCode = 404;
        return next(customErr);
      }
      next(err);
    });
};

// Создать
const createUser = (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
};

// Обновить (runValidators заставит Mongoose проверить данные еще раз)
const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        return next(err);
      }
      res.json(user);
    })
    .catch(next);
};

// Удалить
const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        return next(err);
      }
      res.json({ message: 'Пользователь удален' });
    })
    .catch(next);
};
;
export { getUsers, getUserById, createUser, updateUser, deleteUser };