class EatException extends Error {
  constructor(message) {
    super(message || 'No more junk food, dumpling.');
    this.name = 'EatException';
  }
}

module.exports = { EatException };
