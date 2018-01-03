const request = require('request-promise');
const os = require('os');
let config;

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  if(os.hostname().indexOf("local") > -1) {
    config = require('../config.js');
  } else {
    console.log('config.js not found');
  }

  const token = (config && config.TOKEN ? config.TOKEN : process.env.API_KEY);

  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };
  // console.log('gonna try to getReposByUsername with options:', options);
  return request(options);

}

module.exports.getReposByUsername = getReposByUsername;