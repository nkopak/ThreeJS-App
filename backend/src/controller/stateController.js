const stateService = require("../service/stateService")

module.exports = {
  saveState: async (req, res) => {
    try {
      let response
      let statusCode

      const { id } = req.body

      const isStateRegistered = await stateService.getStateById(id)

      if (isStateRegistered) {
        await stateService.updateStateById(id, req.body)
        response = await stateService.getStateById(id)
        statusCode = 200
      }

      if (!isStateRegistered) {
        response = await stateService.saveState(id, req.body)
        console.log(response)
        statusCode = 201
      }

      res.status(statusCode).json(response)
    } catch (error) {
      res.json(error.message)
    }
  },

  getStateById: async (req, res) => {
    try {
      const { id } = req.params

      const response = await stateService.getStateById(id)

      res.status(200).json(response)
    } catch (error) {
      res.json(error.message)
    }
  }
}
