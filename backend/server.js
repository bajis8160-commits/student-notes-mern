const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 1. Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes_db';
mongoose.connect(MONGO_URI).then(() => console.log('MongoDB Connected'));

// 2. Schema & Model with File support
const Note = mongoose.model('Note', new mongoose.Schema({
  subject: String,
  title: String,
  content: String,
  fileName: String,
  fileData: String
}));

// 3. REST API Routes
app.get('/notes', async (req, res) => {
  res.json(await Note.find());
});

app.post('/notes', async (req, res) => {
  res.status(201).json(await Note.create(req.body));
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
