const fs = require('fs');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileNameArr = file.originalname.split('.');
    cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
  },
});
const upload = multer({ storage });
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nlpRouter = require('./public/assets/js/nlp');

app.use(express.static('public/assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/nlp', nlpRouter);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.use(express.static('uploads'));
app.post('/record', upload.single('audio'), (req, res) => res.json({ success: true }));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;