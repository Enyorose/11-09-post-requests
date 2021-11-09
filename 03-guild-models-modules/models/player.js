const mongoose = require('./db')

/*****************/
/* Define Schema */
/*****************/

const playerSchema = new mongoose.Schema({
  id: Number,
  //todo stop players from inserting
  name: {
    type: String,
    unique: true
  },
  class: String,
  race: String,
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charisma: Number,
  //todo add poisoned property to new players with a default of false
  poisoned: { 
    type: Boolean,
    default: false
  }
})

/*****************/
/* Compile Model */
/*****************/
module.exports = mongoose.model('Player', playerSchema)