const mongoose = require('mongoose');
// Use bluebird
mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));

// Use q. Note that you **must** use `require('q').Promise`.
mongoose.Promise = require('q').Promise;
// assert.ok(query.exec() instanceof require('q').makePromise);
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    index: true
  },
  name: String,
  owner: {
    login: String,
    avatar_url: String
  },
  html_url: String,
  description: String,
  created_at: Date,
  stargazers_count: {
    type: Number,
    index: true
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return Promise.all(repos.map(repo => {
    let doc = {
      id: repo.id,
      name: repo.name,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url
      },
      html_url: repo.html_url,
      description: repo.description,
      created_at: repo.created_at,
      stargazers_count: repo.stargazers_count
    };
    return Repo.update({id: repo.id}, doc, {upsert: true});
  }));
}

let find = (maxResultCount) => {
  return Repo.find()
    .limit(maxResultCount)
    .sort('-stargazers_count')
    .exec();
}

module.exports.save = save;
module.exports.find = find;