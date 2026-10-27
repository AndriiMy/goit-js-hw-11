import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const escapeHTML = value =>
  String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);

export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${escapeHTML(largeImageURL)}">
        <img class="gallery-image" src="${escapeHTML(webformatURL)}" alt="${escapeHTML(tags)}" loading="lazy" />
      </a>
      <ul class="stats">
        <li><strong>Likes</strong><span>${likes}</span></li>
        <li><strong>Views</strong><span>${views}</span></li>
        <li><strong>Comments</strong><span>${comments}</span></li>
        <li><strong>Downloads</strong><span>${downloads}</span></li>
      </ul>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
