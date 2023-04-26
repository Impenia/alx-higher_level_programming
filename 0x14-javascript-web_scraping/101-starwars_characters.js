#!/usr/bin/node
// retrieves all character names in SW film
onst request = require('request');

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
      for (let i = 0; i < characters.length; i++) {
        console.log(movie.characters[i] + ': ' + characters[i]);
      }
    }).catch(error => {
      console.error(error);
    });
  }
});
