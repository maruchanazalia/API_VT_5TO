const { createUser, login, getUserByUserId, getUsers, deleteUser } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../infrastructure/token_validation");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.post("/", checkToken, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.delete("/", checkToken, deleteUser);

module.exports = router;
