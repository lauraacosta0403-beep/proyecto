const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://aldairm945_01:Alda12345@cluster01-shard-00-00.ncdowr1.mongodb.net:27017,cluster01-shard-00-01.ncdowr1.mongodb.net:27017,cluster01-shard-00-02.ncdowr1.mongodb.net:27017/gametracker?ssl=true&replicaSet=atlas-yo2j4u-shard-0&authSource=admin&retryWrites=true&w=majority")

  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Error MongoDB:", err));

app.listen(4000, () => console.log("Servidor listo en http://localhost:4000"));
