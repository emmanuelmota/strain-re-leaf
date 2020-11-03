const express = require('express');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
const bodyParser = require('body-parser');

const items = require('../database-mongo');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/items/results', (req, res) => {
  console.log('Get in server', req.query);

  items.selectSome(req.query, (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/items', (req, res) => {
  console.log('Log in server index', req);
  items.addOne(req.body, (err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201).send(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
