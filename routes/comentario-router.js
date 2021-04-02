const express = require("express");
const bcrypt  = require("bcrypt");
const Comentario  = require("../models/comentario");

const router  = express.Router();

const validarPreenchimentoCampos = (request, response, next) => { 
  if ((request.body.txt_usuario == "") || 
      (request.body.txt_email == "") || 
      (request.body.txt_comentario == "") ||  
      (request.body.txt_senha == "")) {        
    return response.status(400).json({ erro: "Um ou mais campos não foram preenchidos." });
  }    
  next();
}

router.use('/comentario', express.static(process.cwd() + '/public/site/comentario'));

router.post('/comentario', validarPreenchimentoCampos, (request, response) => { 
  Comentario
    .findOne({ 
      usuario   : request.body.txt_usuario, 
      email     : request.body.txt_email, 
      comentario: request.body.txt_comentario 
    })
    .then(documento => {
      if (documento) {
        return response.status(400).json({ 
          erro: "Comentário já realizado por esse usuário." }
        );
      } else {
        const novo_comentario = Comentario({
          usuario   : request.body.txt_usuario,
          email     : request.body.txt_email,
          comentario: request.body.txt_comentario,
          senha     : request.body.txt_senha,
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(novo_comentario.senha, salt, (error, hash) => {
            if (error) throw error;              
            novo_comentario.senha = hash;
            novo_comentario
              .save()
              .then(comentario => response.status(201).json(comentario))        
              .catch(error => console.log(error));
          });
        });
      }
    })
    .catch(
      error => console.log(error)
    );
});

module.exports = router;
