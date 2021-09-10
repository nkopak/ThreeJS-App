const router = require("express").Router()

const stateRouter = require("./stateRouter")

router.get("/api", (req, res) => {
  res.json("Api router")
})

router.use("/api/state", stateRouter)

module.exports = router
