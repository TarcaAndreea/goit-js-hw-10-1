import axios from 'axios';

const URL = 'https://api.thecatapi.com/v1/breeds';
axios.defaults.headers.common['x-api-key'] =
  'live_erB4iQpDGOXTqXtlqOZee0fLwGSlD1W5kAcTita5gX5yFHV8UyVRJITGZB7c2ty8';
function fetchBreeds() {
  return new axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}
function fetchCatByBreed(breedId) {
  return new axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  ).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data[0];
  });
}
export default { fetchBreeds, fetchCatByBreed };
