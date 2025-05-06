const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const secret = 'shovhsOHIHjk4h534Vdvs6A7F7Scdv6svdvIUI';

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.post('/submit', (req, res) => {
  const {
    name,
    alias,
    num,
    about,
    photo,
    checkbox_origin,
    levelOfControl,
    origin,
  } = req.body;

  req.session.hero = {
    name,
    alias,
    num,
    about,
    photo,
    checkbox_origin: Array.isArray(checkbox_origin)
      ? checkbox_origin
      : [checkbox_origin],
    levelOfControl,
    origin,
  };
  res.redirect('/');
});

app.get('/', (req, res) => {
  if (req.session.hero) {
    res.send(`
        <h1>Session for new</h1>
        <p>Name: ${req.session.hero.name}</p>
        <p>Alias: ${req.session.hero.alias}</p>
        <p>Age: ${req.session.hero.num}</p>
        <p>Description: ${req.session.hero.about}</p>
        <p>Photo: ${req.session.hero.photo}</p>
        <p>Powers: ${req.session.hero.checkbox_origin.join(', ')}</p>
        <p>Level of Control: ${req.session.hero.levelOfControl}</p>
        <p>Publacity: ${req.session.hero.origin}</p>
        <form action="/forget" method="post">
            <fieldset>
                <button type="submit">Forget</button>
            </fieldset>
        </form>
    `);
  } else {
    const filePath = path.join(__dirname, 'form.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/html' });
        res.end('<h1>Not Found</h1>');
      } else {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(data);
      }
    });
  }
});

app.post('/forget', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/html' });
      res.end('<h1>Not Found</h1>');
    } else {
      res.redirect('/');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
