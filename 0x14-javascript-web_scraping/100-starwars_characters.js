#!/usr/bin/node
// retrieves all character names in SW film
const request = require('request');

const movieID = process.argv[2];

request(`https://swapi-api.alx-tools.com/api/films/${movieID}`, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const movie = JSON.parse(body);
    const characterPromises = movie.characters.map(characterUrl => {
      return new Promise((resolve, reject) => {
        request(characterUrl, function (error, response, body) {
          if (error) {
            reject(error);
          } else {
            const character = JSON.parse(body);
            resolve(character.name);
          }
        });
      });
    });
    Promise.all(characterPromises).then(characters => {
      console.log(characters.join('\n'));
    }).catch(error => {
      console.error(error);
    });
  }
});
