const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let api = require('../helpers/github');
let db = require('../database/index');

// let app = express.createServer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('received post body.username:', req.body.username);
  // res.json(null);

  // make call to github API.
  api.getReposByUsername(req.body.username)
  .then(repos => {
    // upon successful response from API, send post response 201
    res.json('Post successful');

    // save repo info to db
    repos = JSON.parse(repos);
    db.save(repos)
      .then(response => {
        console.log('db.save response:', response);
      })
      .catch(err => {
        console.error('Error on db.save:', err);
      })
  })
  .catch(err => {
    // upon error, send post response 500
    res.status(500).json({ error: err });
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // read from db
  db.find(25)
    .then(docs => {
      console.log('top 25 docs in db:', docs);
      // respond with db results
      res.json({'repos': docs});
    })
    .catch(err => {
      console.error('Error on db find:', err);
      res.status(404).json({ error: err });
    });
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

