const fs = require('fs');
const path = require('path');
const express = require('express');
const ListAvengerQuotes = require('./ListAvengerQuotes');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-original-quotes', (req, res) => {
  const quotes = getSampleQuotes();
  res.json(quotes);
});

app.post('/convert-to-xml', (req, res) => {
  const listQuotes = new ListAvengerQuotes();
  const quotes = req.body.quotes || getSampleQuotes();

  quotes.forEach((quote) => {
    const comments = quote.comments.map((c) => new Comment(c.date, c.comment));
    listQuotes.addQuote(
      new AvengerQuote(
        quote.id,
        quote.author,
        quote.quote,
        quote.photo,
        quote.publishDate,
        comments
      )
    );
  });

  const xml = listQuotes.toXML('avenger_quote.xml');
  res.json({ success: !!xml, xml: xml });
});

app.get('/convert-from-xml', (req, res) => {
  const listQuotes = new ListAvengerQuotes();
  const quotes = listQuotes.fromXML('avenger_quote.xml');
  res.json(quotes || []);
});

function getSampleQuotes() {
  return [
    {
      id: 1,
      author: 'Iron Man',
      quote: 'I am Iron Man.',
      photo: [
        'https://example.com/ironman1.jpg',
        'https://example.com/ironman2.jpg',
      ],
      publishDate: '2008-05-02',
      comments: [
        { date: '2008-05-02', comment: 'Iconic scene' },
        { date: '2008-05-03', comment: 'Best moment' },
      ],
    },
    {
      id: 2,
      author: 'Captain America',
      quote: 'I can do this all day.',
      photo: ['https://example.com/captain1.jpg'],
      publishDate: '2011-07-22',
      comments: [{ date: '2011-07-22', comment: 'Inspirational' }],
    },
    {
      id: 3,
      author: 'Thor',
      quote: 'Bring me Thanos!',
      photo: ['https://example.com/thor1.jpg', 'https://example.com/thor2.jpg'],
      publishDate: '2018-04-27',
      comments: [
        { date: '2018-04-27', comment: 'Epic moment' },
        { date: '2018-04-28', comment: 'Awesome' },
      ],
    },
    {
      id: 4,
      author: 'Hulk',
      quote: 'Hulk smash!',
      photo: ['https://example.com/hulk1.jpg'],
      publishDate: '2012-05-04',
      comments: [{ date: '2012-05-04', comment: 'Smash hit' }],
    },
  ];
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
