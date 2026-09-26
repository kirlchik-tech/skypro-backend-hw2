import Book from '../models/book.js';

// Получить всех
const getBooks = (req, res, next) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(next); // Передаем ошибку в глобальный обработчик
};

// Получить по ID
const getBookById = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      // Если запрос прошел, но книги с таким ID нет в базе
      if (!book) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        return next(err);
      }
      res.json(book);
    })
    .catch(err => {
      // Если передали кривой ID (не формат Mongo)
      if (err.name === 'CastError') {
        const customErr = new Error('Некорректный ID');
        customErr.statusCode = 404;
        return next(customErr);
      }
      next(err);
    });
};

// Создать
const createBook = (req, res, next) => {
  Book.create(req.body)
    .then(book => res.json(book))
    .catch(next);
};

// Обновить (runValidators заставит Mongoose проверить данные еще раз)
const updateBook = (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(book => {
      if (!book) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        return next(err);
      }
      res.json(book);
    })
    .catch(next);
};

// Удалить
const deleteBook = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      if (!book) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        return next(err);
      }
      res.json({ message: 'Пользователь удален' });
    })
    .catch(next);
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };