const { calculateTime: normalTime } = require('./normal-router');
const path = require('path');
const fs = require('fs');

function calculateTime() {
  const normal = normalTime();

  const years = normal.years();
  const months = normal.months();
  const days = normal.days();

  const totalDays = years * 365 + months * 30 + days;
  const quantumDays = totalDays / 7;

  const quantumYears = Math.floor(quantumDays / 365);
  const remainingDaysAfterYears = quantumDays % 365;

  const quantumMonths = Math.floor(remainingDaysAfterYears / 30.4167);
  const remainingDaysAfterMonths = remainingDaysAfterYears % 30.4167;

  const quantumDaysLeft = Math.floor(remainingDaysAfterMonths);

  return [quantumYears, quantumMonths, quantumDaysLeft];
}

function quantumRouter(req, res) {
  const quantumTime = calculateTime();
  const templatePath = path.join(__dirname, 'views', 'quantum.ejs');
  fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500);
      console.log('Server error');
    } else {
      const rendered = data
        .replace('<%= quantumTime[0] %>', quantumTime[0])
        .replace('<%= quantumTime[1] %>', quantumTime[1])
        .replace('<%= quantumTime[2] %>', quantumTime[2]);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rendered);
    }
  });
}

module.exports = quantumRouter;
