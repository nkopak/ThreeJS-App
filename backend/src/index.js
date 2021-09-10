const express = require("express")
const apiRouter = require("./router/apiRouter")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use(
  express.static(path.join(__dirname, "..", "..", "frontend/dist/test-threejs"))
)

console.log(__dirname)

app.use("/", apiRouter)

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend/dist/test-threejs/index.html")
  )
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`)
})

function connectDB() {
  mongoose.connect(process.env.MONGODB_PORT)

  const { connection } = mongoose

  connection.on("error", error => {
    console.log(error)
  })
}
