const { createAdmin, login, getAdminId, getAll, deleteAdmin} = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../infrastructure/token_validation");

router.post("/", createAdmin);
router.get("/", checkToken, getAll);
router.post("/", checkToken, createAdmin);
router.get("/:id", checkToken, getAdminId);
router.post("/login", login);
router.delete("/", checkToken, deleteAdmin);

module.exports = router;
