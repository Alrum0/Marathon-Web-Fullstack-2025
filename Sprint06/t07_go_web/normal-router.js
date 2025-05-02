const path = require('path');
const fs = require('fs');

function calculateTime() {
  const startDate = new Date('1939-01-01');
  const currentDate = new Date('2021-01-19');

  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: () => years,
    months: () => months,
    days: () => days,
  };
}

function normalRouter(req, res) {
  const time = calculateTime();
  const templatePath = path.join(__dirname, 'views', 'normal.ejs');
  fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500);
      console.log('Server error');
    } else {
      const rendered = data
        .replace('<%= years %>', time.years())
        .replace('<%= months %>', time.months())
        .replace('<%= days %>', time.days());
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rendered);
    }
  });
}

module.exports = {
  normalRouter,
  calculateTime,
};
