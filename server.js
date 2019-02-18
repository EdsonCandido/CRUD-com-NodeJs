console.log("INICIALIZANDO...");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoCliente = require('mongodb').MongoClient;
const ObjectId  = require('mongodb').ObjectId;

const uri = "mongodb://localhost:27017/crud-nodejs";

MongoCliente.connect(uri, (err, client) =>{
  //O serve roda aqui
  if(err){
    return console.log(err);
  }
  db = client.db('crud-nodejs');

  app.listen(3000, ()=>{
    console.log('Serve 3000');
    console.log("SE CHEGOU ATÉ AQUI TA SAFE");
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
//EDITANDO DADOS DO BANCO DE DADOS
app.route('/edit/:id').get((req, res) => {
  var id = req.params.id;

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if(err) return res.send(err + 'aqui ');
    res.render('edit.ejs', { data: result })
  }) 
}).post((req, res) => {
  var id = req.params.id;
  var name = req.body.name;
  var surname = req.body.surname;

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set:{
      name : name,
      surname : surname
    }
  }, (err, result) => {
    if(err) return res.send(err);

    res.redirect('/show');
    console.log('Dado Atualizado' + id);
  });
});
//DELETANDO INFORMAÇÕES DO BANCO 
app.route('/delete/:id').get((req, res) => {
  var id = req.params.id;

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if(err) return res.send(500, err);
    console.log("ID : "+id+" DELETADO COM SUCESSO");
    res.redirect('/show');
  });
});

