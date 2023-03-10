import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const gallRef = document.querySelector('.gallery');

function createGalleryItemMarkUp({ preview, original, description } = {}) {
  return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `;
}

const galleryItemsMarkup = galleryItems.map(createGalleryItemMarkUp).join('');

gallRef.innerHTML = galleryItemsMarkup;

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 251,
});
