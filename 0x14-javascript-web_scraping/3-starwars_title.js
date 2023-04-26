#!/usr/bin/node
// Prints the title of a Star Wars movie where the episode number
// matches the given integer

const request = require('request');

const movieID = process.argv[2];

request(`https://swapi-api.alx-tools.com/api/films/${movieID}`, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const movie = JSON.parse(body);
    console.log(movie.title);
  }
});
