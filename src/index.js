import { PixabayAPI } from "./PixabayAPI";
import { createPhotoGalleryMarkup } from "./markup";
import refs from './refs';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const pixabay = new PixabayAPI();

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

function renderPhotoGalleryMarkup(hits) {
    const markup = createPhotoGalleryMarkup(hits);
    refs.galleryWrapper.insertAdjacentHTML('beforeend', markup);
}

function handleSubmit (ev) {
    ev.preventDefault();

    const {elements: {searchQuery}} = ev.currentTarget;
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
        Notify.failure('Please, enter your search details');
        return;
    }
    pixabay.query = query;

    pixabay.getPhotos(query).then(({ hits, total }) => {
        renderPhotoGalleryMarkup(hits);
        pixabay.calculateTotalHits(total);

        if (pixabay.isShowLoadMore) {
            refs.loadMoreBtn.classList.remove('is-hidden');
        }
    });
};

function onLoadMoreClick() {
    pixabay.incrementPage();

    pixabay.getPhotos().then(({ hits }) => {
        renderPhotoGalleryMarkup(hits);
    });
}


