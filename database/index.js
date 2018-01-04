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
  html_contributors_url: String,
  stargazers_count: {
    type: Number,
    index: true
  }
});

let contributorSchema = mongoose.Schema({
  repo_id: Number,
  user_id: Number,
  login: String,
  avatar_url: String,
  html_url: String,
  repos_url: String,
  contributions: Number
});
contributorSchema.index({repo_id: 1, user_id: 1});

let Repo = mongoose.model('Repo', repoSchema);
let Contributor = mongoose.model('Contributor', contributorSchema);
// https://api.github.com/repos/hackreactor/jsconf2014/contributors
let saveRepos = (repos) => {
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
      html_contributors_url: repo.contributors_url.replace('api.','').replace('repos/',''),
      stargazers_count: repo.stargazers_count
    };
    return Repo.findOneAndUpdate({id: repo.id}, doc, {upsert: true, rawResult: true});
  }));
}

let saveContributors = (contributors, repoId) => {
  
  return Promise.all(contributors.map(contributor => {
    let doc = {
      repo_id: repoId,
      user_id: contributor.id,
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      repos_url: contributor.repos_url,
      contributions: contributor.contributions
    };
    return Contributor.findOneAndUpdate({repo_id: repoId, user_id: contributor.user_id},
      doc, {upsert: true, rawResult: true});
  }));
}

let findRepos = (maxResultCount) => {
  return Repo.find()
    .limit(maxResultCount)
    .sort('-stargazers_count')
    .exec();
}

module.exports.saveRepos = saveRepos;
module.exports.saveContributors = saveContributors;
module.exports.findRepos = findRepos;