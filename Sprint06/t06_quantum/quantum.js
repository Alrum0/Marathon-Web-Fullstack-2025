const { calculateTime: normalTime } = require('./normal');

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

module.exports = { calculateTime };

/*
  Загальні дні: 82*365 + 0*30 + 18 = 29948 днів
  Квантові дні: 29948 / 7 ≈ 4278.2857 днів
  Квантові роки: 4278.2857 / 365 ≈ 11.7213 (11 років)
  Залишок: 4278.2857 % 365 ≈ 263.2857 днів
  Квантові місяці: 263.2857 / 30.4167 ≈ 8.657 (8 місяців)
  Залишок: 263.2857 % 30.4167 ≈ 19.9999 днів
  Округлення: Math.floor(19.9999) = 19 днів 
*/
