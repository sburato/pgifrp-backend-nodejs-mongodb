const auth      = require("./routes/auth");
const express   = require("express");
const mongoose  = require("mongoose"); 
const bodyparse = require("body-parser");  
const db_access = require("./setup/db").mongoURL; 

const app = express();

mongoose
  .connect(db_access, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão ao MongoDB bem sucedida."))
  .catch(error => console.log(error));

app.use(bodyparse.urlencoded({extended: false}));
app.use(bodyparse.json());

app.use("/auth", auth);

app.get("/", (request, response) => {
  response.send("Hello World");
});

const port = 3000;

app.listen(port, () => console.log(`Executando na porta ${port}`));