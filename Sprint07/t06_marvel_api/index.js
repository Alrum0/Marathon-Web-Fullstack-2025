const express = require('express');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const MARVEL_PUBLIC_KEY = '6ebd84417fca384567a756420d020df3';
const MARVEL_PRIVATE_KEY = 'cc4cbbef834008ef8b531c4574715f5950cc88b4';

app.use(express.static(path.join(__dirname)));

app.get('/fetch-marvel-data', async (req, res) => {
  const timestamp = new Date().getTime();
  const hash = crypto
    .createHash('md5')
    .update(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
    .digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

  try {
    const response = await axios.get(url);
    const data = response.data.data.results;
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching api');
  }
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
