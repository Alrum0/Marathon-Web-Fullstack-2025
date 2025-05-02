const { Avenger } = require('./Avenger');

class Team {
  constructor(id, avengers) {
    this.id = id;
    this.avengers = avengers;
  }

  battle(damage) {
    this.avengers.forEach((avenger) => {
      avenger.hp -= damage.damage;
    });
    this.avengers = this.avengers.filter((avenger) => avenger.hp > 0);
  }

  calculateLosses(clonedTeam) {
    const originTeam = clonedTeam.avengers.length;
    const currentTeam = this.avengers.length;
    const result = originTeam - currentTeam;

    if (result === 0) {
      console.log("We haven't lost anyone in this battle!");
    } else {
      console.log(
        `In this battle we lost ${result} Avenger${result > 1 ? 's' : ''}.`
      );
    }
  }

  clone() {
    const clonedAvengers = this.avengers.map(
      (avenger) =>
        new Avenger(
          avenger.name,
          avenger.alias,
          avenger.gender,
          avenger.age,
          avenger.powers,
          avenger.hp
        )
    );
    return new Team(this.id, clonedAvengers);
  }
}

module.exports = { Team };
