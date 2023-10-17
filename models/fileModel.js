import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  filename: String,
  path: String,
  mimetype: String,
});

export default mongoose.model('File', fileSchema);