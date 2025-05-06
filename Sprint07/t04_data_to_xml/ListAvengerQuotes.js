// const fs = require('fs');
// const path = require('path');
// const { XMLParser, XMLBuilder } = require('fast-xml-parser');

// module.exports = class ListAvengerQuotes {
//   constructor() {
//     this.quotes = [];
//   }

//   addQuote(quoute) {
//     this.quotes.push(quoute);
//   }
//   toXML(fileName) {
//     const builder = new XMLBuilder();
//     const xmlContent = builder.build({ quotes: this.quotes });

//     try {
//       fs.writeFileSync(fileName, xmlContent);
//     } catch (err) {
//       console.error(err);
//     }
//     return xmlContent;
//   }

//   fromXML(fileName) {
//     const filesName = path.join(__dirname, fileName);
//     if (fs.existsSync(filesName)) {
//       try {
//         const xmlData = fs.readFileSync(filesName, 'utf-8');
//         const parser = new XMLParser();
//         const jObj = parser.parse(xmlData);

//         this.quotes = jObj.quotes || [];
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       console.warn('File not found', filesName);
//     }
//   }
// };

const fs = require('fs');
const path = require('path');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

module.exports = class ListAvengerQuotes {
  constructor() {
    this.quotes = [];
  }

  addQuote(quote) {
    this.quotes.push(quote);
  }

  toXML(fileName) {
    const options = {
      ignoreAttributes: false,
      format: true,
      suppressEmptyNode: true,
    };

    const builder = new XMLBuilder(options);
    const xmlContent = builder.build({
      AvengerQuotes: {
        Quote: this.quotes.map((quote) => ({
          id: quote.id,
          author: quote.author,
          quote: quote.quote,
          photo: quote.photo,
          publishDate: quote.publishDate,
          comments: quote.comments.map((comment) => ({
            date: comment.date,
            text: comment.comment,
          })),
        })),
      },
    });

    try {
      fs.writeFileSync(fileName, xmlContent);
      return xmlContent;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  fromXML(fileName) {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn('File not found', filePath);
      return null;
    }

    try {
      const xmlData = fs.readFileSync(filePath, 'utf-8');
      const parser = new XMLParser({
        ignoreAttributes: false,
        isArray: (name) => name === 'comments' || name === 'Quote',
      });
      const parsed = parser.parse(xmlData);

      if (parsed.AvengerQuotes && parsed.AvengerQuotes.Quote) {
        const AvengerQuote = require('./AvengerQuote');
        const Comment = require('./Comment');

        this.quotes = parsed.AvengerQuotes.Quote.map((q) => {
          const comments = q.comments
            ? (Array.isArray(q.comments) ? q.comments : [q.comments]).map(
                (c) => new Comment(c.date, c.text || c.comment)
              )
            : [];

          return new AvengerQuote(
            parseInt(q.id),
            q.author,
            q.quote,
            q.photo,
            q.publishDate,
            comments
          );
        });
      }
      return this.quotes;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
