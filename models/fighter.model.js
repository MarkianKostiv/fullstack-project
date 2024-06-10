class Fighter {
  constructor(id, name, power, defense, health = 85) {
    this.id = id;
    this.name = name;
    this.power = power;
    this.defense = defense;
    this.health = health;
  }
}

module.exports = Fighter;
