#!/usr/bin/node
// makes get request for SW movie id
const request = require('request');
request(`http://swap-api.alx-tools.com/api/films/:id`, function (error, response, body) {
  error && console.log(error);
  console.log(JSON.parse(body).title);
});
