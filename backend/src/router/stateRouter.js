const stateController = require("../controller/stateController")

const router = require("express").Router()

router.get("/:id", stateController.getStateById)

router.post("/", stateController.saveState)

module.exports = router
