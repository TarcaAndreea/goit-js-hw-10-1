import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectBtn = document.querySelector('.breed-select');
const loading = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('cat-info');

selectBtn.addEventListener('change', selectEvent);
function selectEvent(e) {
  e.preventDefault();
  const breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const img = data.url;
      const description = data.breeds[0].description;
      const name = data.breeds[0].name;
      const temperament = data.breeds[0].temperament;
    })
    .catch(() => {
      errorMessage.style.display = 'block';
    });
}

fetchBreeds()
  .then(cats => {
    cats.map(cat => {
      const option = `<option value ="${cat.id}">${cat.name}</option>`;
      selectBtn.insertAdjacentHTML('beforeend', option); // Update select to selectBtn
    });
  })
  .catch(() => {
    errorMessage.style.display = 'block';
  });
