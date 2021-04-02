const express   = require("express");
const mongoose  = require("mongoose"); 
const bodyparse = require("body-parser");  
const db_access = require("./setup/db").mongoURL; 
const comentarioRouter = require("./routes/comentario-router");

const app = express();

mongoose
  .connect(db_access, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão ao MongoDB bem sucedida."))
  .catch(error => console.log(error));

app.use(bodyparse.urlencoded({extended: false}));
app.use(bodyparse.json());

app.use('/', express.static(__dirname + '/public/site/landingpage'));
app.use(comentarioRouter);

app.get('*', (request, response) => response.send("<h1>Rota não encontrada: 404</h1>"));

const port = 3000;

app.listen(port, () => console.log(`Executando na porta ${port}`));