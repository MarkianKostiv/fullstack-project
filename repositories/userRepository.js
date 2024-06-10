// repositories/userRepository.js
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
  return db.users;
};

exports.getById = (id) => {
  const db = readDatabase();
  return db.users.find((user) => user.id === id);
};

exports.create = (user) => {
  const db = readDatabase();
  user.id = Date.now().toString();
  db.users.push(user);
  writeDatabase(db);
  return user;
};

exports.update = (id, updatedFields) => {
  const db = readDatabase();
  const userIndex = db.users.findIndex((user) => user.id === id);
  if (userIndex === -1) return null;
  const updatedUser = { ...db.users[userIndex], ...updatedFields };
  db.users[userIndex] = updatedUser;
  writeDatabase(db);
  return updatedUser;
};

exports.delete = (id) => {
  const db = readDatabase();
  const userIndex = db.users.findIndex((user) => user.id === id);
  if (userIndex === -1) return false;
  db.users.splice(userIndex, 1);
  writeDatabase(db);
  return true;
};

exports.getByEmail = (email) => {
  const db = readDatabase();
  return db.users.find((user) => user.email === email);
};

exports.getByPhoneNumber = (phoneNumber) => {
  const db = readDatabase();
  return db.users.find((user) => user.phoneNumber === phoneNumber);
};
