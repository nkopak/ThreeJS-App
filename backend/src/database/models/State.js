const { Schema, model } = require("mongoose")

const stateSchema = new Schema({
  id: { type: String, required: true },
  position: [{ type: Number }],
  rotation: [{ type: Schema.Types.Mixed }]
})

stateSchema.path("position").validate(function (position) {
  return (position.length = 3)
})

stateSchema.path("rotation").validate(function (rotation) {
  return (rotation.length = 4)
})

module.exports = model("State", stateSchema)

//State object example
// {
//   "id": "A7A99548-1F72-44B8-925C-0299E641EBD2",
//   "position": [
//     -906.8306819309192,
//     -166.59521704025263,
//     -1772.678352768499
//   ],
//   "rotation": [
//     2.8353149891302687,
//     -0.8865619177661249,
//     2.8940050774332833,
//     "XYZ"
//   ]
// }
