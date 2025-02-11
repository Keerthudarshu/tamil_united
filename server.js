const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// MongoDB setup
mongoose.connect('mongodb://127.0.0.1:27017/trust', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  category: String,
  type: String,
  description: String,
  filename: String,
});

const Image = mongoose.model('Image', imageSchema);

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Image upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { category, type, description } = req.body;
    const newImage = new Image({
      category,
      type,
      description,
      filename: req.file.filename,
    });

    await newImage.save();
    res.status(201).send('Image uploaded successfully!');
  } catch (error) {
    res.status(500).send('Error uploading image.');
  }
});


// Fetch all images endpoint
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).send('Error fetching images.');
  }
});

// Fetch sports images directly
app.get('/images/Sports', async (req, res) => {
  try {
    const sportsImages = await Image.find({ category: 'Sports' });
    res.json(sportsImages);
  } catch (error) {
    res.status(500).send('Error fetching sports images.');
  }
});

// Fetch sports images directly
app.get('/images/Medical', async (req, res) => {
  try {
    const medicalImages = await Image.find({ category: 'Medical' });
    res.json(medicalImages);
  } catch (error) {
    res.status(500).send('Error fetching sports images.');
  }
});

// Fetch Education images directly
app.get('/images/Education', async (req, res) => {
  try {
    const educationImages = await Image.find({ category: 'Education' });
    res.json(educationImages);
  } catch (error) {
    res.status(500).send('Error fetching education images.');
  }
});

app.get('/images/Banner', async (req, res) => {
  try {
    const banners = await Image.find({ type: 'Banner' });
    res.json(banners);
  } catch (error) {
    res.status(500).send('Error fetching banner images.');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});