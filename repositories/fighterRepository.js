const fs = require("fs");
const path = require("path");
const databasePath = path.resolve(__dirname, "../config/database.json");

const readDatabase = () => {
  return JSON.parse(fs.readFileSync(databasePath, "utf8"));
};

const writeDatabase = (data) => {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

exports.getAll = () => {
  const db = readDatabase();
  return db.fighters;
};

exports.getById = (id) => {
  const db = readDatabase();
  return db.fighters.find((fighter) => fighter.id === id);
};

exports.create = (fighter) => {
  const db = readDatabase();
  fighter.id = Date.now().toString();
  db.fighters.push(fighter);
  writeDatabase(db);
  return fighter;
};

exports.update = (id, updatedFields) => {
  const db = readDatabase();
  const fighterIndex = db.fighters.findIndex((fighter) => fighter.id === id);
  if (fighterIndex === -1) return null;
  const updatedFighter = { ...db.fighters[fighterIndex], ...updatedFields };
  db.fighters[fighterIndex] = updatedFighter;
  writeDatabase(db);
  return updatedFighter;
};

exports.delete = (id) => {
  const db = readDatabase();
  const fighterIndex = db.fighters.findIndex((fighter) => fighter.id === id);
  if (fighterIndex === -1) return false;
  db.fighters.splice(fighterIndex, 1);
  writeDatabase(db);
  return true;
};

exports.getByName = (name) => {
  const db = readDatabase();
  return db.fighters.find((fighter) => fighter.name === name);
};
