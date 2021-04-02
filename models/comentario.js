const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const ComentarioSchema = new Schema({
  usuario: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true
  },

  comentario: {
    type: String,
    require: true
  },  
  
  senha: {
    type: String,
    require: true
  },  
  
  date: {
    type: Date,
    default: Date.now()
  },  
});

module.exports = Comentario = mongoose.model("comentario", ComentarioSchema);