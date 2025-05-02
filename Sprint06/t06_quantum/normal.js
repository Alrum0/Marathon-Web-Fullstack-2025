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

module.exports = { calculateTime };
