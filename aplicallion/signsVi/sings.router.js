const { showAll} = require("./sings.controller");
const router = require("express").Router();

router.get("/", showAll);


module.exports = router;