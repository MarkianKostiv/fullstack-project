const fighterRepository = require("../repositories/fighterRepository");

exports.getFighters = (req, res) => {
  const fighters = fighterRepository.getAll();
  res.json(fighters);
};

exports.getFighterById = (req, res) => {
  const fighter = fighterRepository.getById(req.params.id);
  if (fighter) {
    res.json(fighter);
  } else {
    res.status(404).json({ error: true, message: "Fighter not found" });
  }
};

exports.createFighter = (req, res) => {
  const fighter = req.body;
  const existingFighterByName = fighterRepository.getByName(fighter.name);
  if (existingFighterByName) {
    throw new Error("Fighter with this name already exists");
  } else {
    const newFighter = fighterRepository.create(fighter);
    res.status(201).json(newFighter);
  }
};

exports.updateFighter = (req, res) => {
  const fighter = fighterRepository.update(req.params.id, req.body);
  if (fighter) {
    res.json(fighter);
  } else {
    res.status(404).json({ error: true, message: "Fighter not found" });
  }
};

exports.deleteFighter = (req, res) => {
  const success = fighterRepository.delete(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: true, message: "Fighter not found" });
  }
};
