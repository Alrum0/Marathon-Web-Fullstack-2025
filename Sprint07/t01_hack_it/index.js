const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const secret = 'sssdsdB22FSDsdvds3243rvsdOHOIHHfoshsd423';
const PORT = 3000;
global.isHacked = false;

app.use(express.urlencoded({ extended: true }));

const hashedPassword = (password, salt) => {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
};

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  if (req.session.hashPassword) {
    res.send(`
        <h1>Password</h1>
        <form action="/guess" method="post">
            <label>Password saved at sessions</label> <br>
            <label>Hash is: ${req.session.hashPassword}</label><br>
             <label for="guess">Try to guess:</label>
             <input type="text" name="guess" id="guess">
             <button type="submit">Check password</button>
        </form>
        <form action="/clear" method="POST">
                <button type="submit">Clear</button>
            </form>
    `);
  } else {
    // const filePath = path.join(__dirname, 'index.html');
    // fs.readFile(filePath, 'utf8', (err, html) => {
    //   if (err) {
    //     res.writeHead(500, { 'content-type': 'text/html' });
    //     return res.end('<h1>Not Found</h1>');
    //   }
    // });

    res.send(`
         <h1>Password</h1><br>
        ${isHacked ? `<p style="color:green">Hacked!</p>` : ''}
        <form action="/save" method="post">
            <label> Password not saved at session</label><br>
            <label for="password">Password for saving to session: </label>
            <input type="text" name="Password" id="password" required><br>

            <label for="salt">Salt for saving to session</label>
            <input type="text" name="salt" id="salt" required> <br><br>

            <button type="submit">Save</button>
        </form>    
    `);
  }
});

app.post('/guess', (req, res) => {
  const { guess } = req.body;
  if (req.session.Password === guess) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .send(
            'Idk why, but failed to clear session(Це лише t01, а я вже втомився)'
          );
      }
      res.redirect('/');
      isHacked = true;
    });
  } else {
    req.session.message = 'Access denied!';
    req.session.messageColor = 'red';
    res.redirect('/');
  }
});

app.post('/clear', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send(
          'Idk why, but failed to clear session(Ну серйозно, а взагалі, як у тебе справи?)'
        );
    }
    res.redirect('/');
  });
});

app.post('/save', (req, res) => {
  const { Password, salt } = req.body;
  req.session.hashPassword = hashedPassword(Password, salt);
  req.session.Password = Password;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
