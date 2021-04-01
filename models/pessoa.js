const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const PessoaSchema = new Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true
  },
  
  senha: {
    type: String,
    require: true
  },  

  username: {
    type: String,
    require: true
  },
  
  date: {
    type: Date,
    default: Date.now()
  },  
});

module.exports = Pessoa = mongoose.model("pessoa", PessoaSchema);