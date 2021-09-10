const State = require("../database/models/State")
const { MongoClient } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_ATLAS_URI
const client = new MongoClient(uri)

client.connect()
const database = client.db(process.env.CLIENT_DB)
const state = database.collection(process.env.MONGODB_COLLECTION)

module.exports = {
  getStateById: async id => {
    try {
      await client.connect()

      const stateById = await state.findOne({ id })

      return stateById
    } finally {
      await client.close()
    }
  },

  saveState: async (id, stateObject) => {
    try {
      await client.connect()

      await state.insertOne(stateObject)
      const result = await state.findOne({ id })

      return result
    } finally {
      await client.close()
    }
  },

  updateStateById: async (id, stateObject) => {
    try {
      await client.connect()

      const result = await state.updateOne({ id }, { $set: stateObject })

      return result
    } finally {
      await client.close()
    }
  }
}
