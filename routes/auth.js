const express = require("express");
const Pessoa  = require("../models/pessoa");
const bcrypt  = require("bcrypt");

const router  = express.Router();

router.post("/signup", (request, response) => { 
  Pessoa
    .findOne({ email: request.body.email })
    .then(doc_pessoa => {
      if (doc_pessoa) {
        return response.status(400).json({ emailerror: "Email já registrado no sistema." });
      } else {
        const nova_pessoa = Pessoa({
          name: request.body.name,
          email: request.body.email,
          senha: request.body.senha,
          username: request.body.username,
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(nova_pessoa.senha, salt, (error, hash) => {
            if (error) throw error;              
            nova_pessoa.senha = hash;
            nova_pessoa
              .save()
              .then(pessoa => response.status(201).json(pessoa))
              .catch(error => console.log(error));
          });
        });
      }
    })
    .catch(error => console.log(error));
});

router.get("/", (request, response) => response.json({ status: "Acesso permitido"}));

module.exports = router;
