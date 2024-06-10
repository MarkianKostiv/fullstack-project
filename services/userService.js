// services/userService.js
const userRepository = require("../repositories/userRepository");

exports.getUsers = (req, res) => {
  const users = userRepository.getAll();
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = userRepository.getById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: true, message: "User not found" });
  }
};

exports.createUser = (req, res) => {
  const user = req.body;
  const existingUserByEmail = userRepository.getByEmail(user.email);
  const existingUserByPhoneNumber = userRepository.getByPhoneNumber(
    user.phoneNumber
  );

  if (existingUserByEmail) {
    return res
      .status(400)
      .json({ error: true, message: "User with this email already exists" });
  } else if (existingUserByPhoneNumber) {
    return res
      .status(400)
      .json({
        error: true,
        message: "User with this phone number already exists",
      });
  } else {
    const newUser = userRepository.create(user);
    res.status(201).json(newUser);
  }
};

exports.updateUser = (req, res) => {
  const user = userRepository.update(req.params.id, req.body);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: true, message: "User not found" });
  }
};

exports.deleteUser = (req, res) => {
  const success = userRepository.delete(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: true, message: "User not found" });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = userRepository.getByEmail(email);

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: true, message: "Invalid password" });
  }

  res.json({ message: "Login successful", user });
};
