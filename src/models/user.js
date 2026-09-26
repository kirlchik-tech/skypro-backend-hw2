import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
  username: { type: String, required: true, minlength: 5, maxlength: 5 } // Строго 5 символов
});

export default mongoose.model('user', userSchema);