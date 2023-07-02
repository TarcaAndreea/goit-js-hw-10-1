import { fetchCatByBreed } from './cat-api.js';
import { fetchBreeds } from './cat-api.js';
const selectBtn = document.querySelector('.breed-select');
const loading = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

selectBtn.style.visibility = 'visible';
errorMessage.style.visibility = 'hidden';
catInfo.style.visibility = 'hidden';
fetchBreeds()
  .then(response => {
    loading.style.visibility = 'hidden';
    selectBtn.style.visibility = 'visible';

    const cats = response.data;
    for (const cat of cats) {
      const option = document.createElement('option');
      option.value = cat.id;
      option.innerHTML = cat.name;
      selectBtn.appendChild(option);
    }
  })
  .catch(() => {
    loading.style.visibility = 'hidden';
    errorMessage.style.visibility = 'visibile';
  });

selectBtn.addEventListener('change', selectEvent);
function selectEvent(e) {
  e.preventDefault();
  const inputValue = selectBtn.options[selectBtn.selectedIndex].value;
  catInfo.style.visibility = 'hidden';
  loading.style.visibility = 'visible';
  selectBtn.style.visibility = 'visible';

  fetchCatByBreed(inputValue)
    .then(catData => {
      catInfo.style.visibility = 'visible';
      loading.style.visibility = 'hidden';
      const { name, description, temperament } = catData.data[0].breeds[0];
      const { url } = catData.data[0].url;

      const markup = createMarkup(name, description, temperament, url);
      updateCatInfo(markup);
    })
    .catch(err => {
      errorMessage.style.visibility = 'visible';
      console.error(err);
    })
    .finally(() => {
      loading.style, (visibility = 'hidden');
      selectBtn.selectedIndex = 0;
    });
}

function updateCatInfo(markup) {
  catInfo.innerHTML = markup;
  catInfo.style.visibility = 'visible';
  const catImage = document.getElementById('catImage');
  catImage.style.width = '400px';
  catImage.style.height = '300px';
}

function createMarkup(name, description, temperament, url) {
  return `
    <img src="${url}" alt="${name}"id="catImage"/>
    <h2>${name}</h2>
    <p>Description: ${description}</p>
    <p>Temperament: ${temperament}</p>
  `;
}
