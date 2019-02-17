console.log("TUDO SAFE POR AQUI");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000, function () {
  console.log("PORT: 3000");
});

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
  res.render('index.ejs');
});

app.post('/show', (req, res) =>{
  console.log(req.body);
});
