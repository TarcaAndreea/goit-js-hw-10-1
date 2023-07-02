import axios from 'axios';

const URL = 'https://api.thecatapi.com/v1/breeds';
axios.defaults.headers.common['x-api-key'] =
  'live_erB4iQpDGOXTqXtlqOZee0fLwGSlD1W5kAcTita5gX5yFHV8UyVRJITGZB7c2ty8';

export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

export function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
