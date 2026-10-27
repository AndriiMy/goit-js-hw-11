import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.form');
let currentRequest = 0;

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = form.elements['search-text'].value.trim();

  const requestId = ++currentRequest;
  clearGallery();
  if (!query) return;

  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (requestId !== currentRequest) return;
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(() => {
      if (requestId !== currentRequest) return;
      iziToast.error({
        message: 'Failed to load images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      if (requestId === currentRequest) hideLoader();
    });
});
