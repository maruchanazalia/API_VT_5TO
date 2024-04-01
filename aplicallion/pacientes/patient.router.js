const { create, showPatients, getByName, deletePacient, update} = require("./patient.controller");
const router = require("express").Router();

router.post("/", create);
router.get("/", showPatients);
router.get("/:nombre", getByName);
router.delete("/:id", deletePacient);
router.patch("/",update);

module.exports = router;