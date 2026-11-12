const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/notes_db')
  .then(() => console.log('MongoDB Connected'));

// 2. Schema & Model
const Note = mongoose.model('Note', new mongoose.Schema({
  subject: String,
  title: String,
  content: String
}));

// 3. REST API Routes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
