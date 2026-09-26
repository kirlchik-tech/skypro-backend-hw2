import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './src/routes/users.js'; 
import bookRoutes from './src/routes/books.js';

const { PORT = 3005, MONGO_URL = 'mongodb://127.0.0.1:27017/library' } = process.env;

const app = express();

// Подключение к БД
mongoose.connect(MONGO_URL)
  .then(() => console.log('Подключились к базе данных'))
  .catch((err) => console.log('Ошибка БД:', err));

// 1. CORS 
app.use(cors({
  origin: /^http:\/\/localhost(:\d+)?$/ // Разрешает любой порт
}));

// 2. Парсер JSON 
app.use(express.json());

// 3. Кастомный логгер оригинального URL
app.use((req, res, next) => {
  console.log('Запрос по адресу:', req.originalUrl);
  next();
});

// 4. Подключаем роуты
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// 5. Мидлвар для 404 ошибки 
app.use((req, res, next) => {
  res.status(404).json({ message: 'Такого роута не существует' });
});

// 6. Глобальный обработчик ошибок 
app.use((err, req, res, next) => {
  // Проверяем, есть ли у ошибки статус 
  const statusCode = err.statusCode || 500;
  
  // Если ошибка валидации Mongoose, ставим статус 400 или оставляем
  const finalStatus = err.name === 'ValidationError' ? 400 : statusCode;
  
  res.status(finalStatus).json({ 
    message: finalStatus === 500 ? 'На сервере произошла ошибка' : err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Сервер шуршит на порту ${PORT}`);
});