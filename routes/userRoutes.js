// routes/userRoutes.js
const express = require("express");
const validateUser = require("../middlewares/validateUser");
const userService = require("../services/userService");

const router = express.Router();

router.get("/", userService.getUsers);
router.get("/:id", userService.getUserById);
router.post("/", validateUser, userService.createUser);
router.patch("/:id", userService.updateUser);
router.delete("/:id", userService.deleteUser);
router.post("/login", userService.loginUser);

module.exports = router;
