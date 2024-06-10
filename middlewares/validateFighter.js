function validateFighter(req, res, next) {
  const { name, power, defense, health } = req.body;
  const errors = [];

  if (!name) {
    errors.push("Name is required");
  }

  if (power === undefined || power < 1 || power > 100) {
    errors.push("Power must be a number between 1 and 100");
  }

  if (defense === undefined || defense < 1 || defense > 10) {
    errors.push("Defense must be a number between 1 and 10");
  }

  if (health !== undefined && (health < 80 || health > 120)) {
    errors.push("Health must be a number between 80 and 120");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: true, message: errors.join(", ") });
  }

  next();
}

module.exports = validateFighter;
