class Avenger {
  constructor(obj) {
    this.name = obj.name;
    this.gender = obj.gender;
    this.age = obj.age;
    this.alias = obj.alias;
    this.powers = obj.powers;
    const myFn = function Avenger() {
      return [obj.alias.toUpperCase(), obj.powers.join('\n')].join('\n');
    };
    myFn.toString = () => {
      return `name: ${obj.name}\ngender: ${obj.gender}\nage: ${obj.age}`;
    };
    return myFn;
  }
}

module.exports = { Avenger: Avenger };
