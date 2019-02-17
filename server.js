console.log("TUDO SAFE POR AQUI");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoCliente = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/crud-nodejs";

MongoCliente.connect(uri, (err, client) =>{
  //O serve roda aqui
  if(err){
    return console.log(err);
  }
  db = client.db('crud-nodejs');

  app.listen(3000, ()=>{
    console.log('Serve 3000');
  });
});

app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
  res.render('index.ejs');
});

//SALVANDO DADOS NO BANCO DE DADOS 
app.post('/show', (req, res) =>{
  db.collection('data').save(req.body , (err, result) =>{
    if(err) return console.log(err);
    console.log("Savo no banco ");
    res.redirect('/show');
  });
});
//PREPARANDO DADOS PARA EXIBIR NA TELA
app.get('/', (req, res) => {
  let cursor = db.collection('data').find();
});
//LENDO DADOS DO BANCO DE DADOS 
app.get('/show', (req, res) => {
  db.collection('data').find().toArray((err, result) => {
    if(err) return console.log(err);
    res.render('show.ejs', {data: result});
  });
});
