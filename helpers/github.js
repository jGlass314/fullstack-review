const request = require('request-promise');
let config;

let getReposByUsername = (/* TODO */username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  try {
    config = require('../config.js');
  } catch (e) {
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