const mongoose = require('mongoose');
// Use bluebird
mongoose.Promise = require('bluebird');

// Use q. Note that you **must** use `require('q').Promise`.
mongoose.Promise = require('q').Promise;

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';

mongoose.connect(mongodbUri, {
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

let save = (repos) => {
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
    // return Repo.update({id: repo.id}, doc, {upsert: true});
    return Repo.findOneAndUpdate({id: repo.id}, doc, {upsert: true, rawResult: true});
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