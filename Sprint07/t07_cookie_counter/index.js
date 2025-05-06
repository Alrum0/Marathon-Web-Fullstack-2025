const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.use((req, res, next) => {
  const currentTime = Date.now();
  let visits = [];

  try {
    visits = JSON.parse(req.cookies.visits || '[]');
  } catch (err) {
    visits = [];
  }

  visits = visits.filter((ts) => currentTime - ts <= 1000 * 60);
  visits.push(currentTime);

  res.cookie('visits', JSON.stringify(visits), {
    maxAge: 1000 * 60,
  });

  res.locals.cookieCount = visits.length;
  next();
});

app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Cookie counter</h1>
    <div>
        <p>This page was loaded <span id="cookieCount">${res.locals.cookieCount}</span> time(s) in the last minute</p>
    </div>
</body>
</html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
