const request = require('request-promise');
const os = require('os');
let token;
if(os.hostname().indexOf("local") > -1) {
  token = require('../config.js').TOKEN;
} else {
  token = process.env.API_KEY;
}

let getContributorsByContributorURL = (url) => {
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };
  return request(options);
}

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };
  return request(options);
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getContributorsByContributorURL = getContributorsByContributorURL;