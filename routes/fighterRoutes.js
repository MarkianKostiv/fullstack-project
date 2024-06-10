const express = require("express");
const validateFighter = require("../middlewares/validateFighter");
const fighterService = require("../services/fighterService");

const router = express.Router();

router.get("/", fighterService.getFighters);
router.get("/:id", fighterService.getFighterById);
router.post("/", validateFighter, fighterService.createFighter);
router.patch("/:id", fighterService.updateFighter);
router.delete("/:id", fighterService.deleteFighter);

module.exports = router;
