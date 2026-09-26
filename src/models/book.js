import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 20 },
  author: { type: String, required: true, minlength: 2, maxlength: 20 },
  year: { type: Number, required: true }
});

export default mongoose.model('book', bookSchema);