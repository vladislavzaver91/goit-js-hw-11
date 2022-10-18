import { PixabayAPI } from "./PixabayAPI";
import { createPhotoGalleryMarkup } from "./markup";
import refs from './refs';
import scrollTop from "./scrollTop";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const pixabay = new PixabayAPI();

const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0
}

const callback = async function (entries, observer) {
    entries.forEach(async entry => {
        
        if (entry.isIntersecting) {
            pixabay.incrementPage();
            observer.unobserve(entry.target);

            if (!pixabay.isShowLoadMore) {
                observer.unobserve(entry.target);
                Notify.info("We're sorry, but you've reached the end of search results.");
            }

            try {
                const { hits } = await pixabay.getPhotos()
                renderPhotoGalleryMarkup(hits);

                if (pixabay.isShowLoadMore) {
                    const target = document.querySelector('.photo-card:last-child');
                    observer.observe(target);
            }

            lightbox.refresh();
            } catch (error) {
                Notify.failure(error.message, 'Oops, something went wrong!');
                clearPage();
            }
        }
    });
};

const observer = new IntersectionObserver(callback, options);

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

const lightbox = new SimpleLightbox('.gallery a');

function renderPhotoGalleryMarkup(hits) {
    const markup = createPhotoGalleryMarkup(hits);
    refs.galleryWrapper.insertAdjacentHTML('beforeend', markup);
}

async function handleSubmit (ev) {
    ev.preventDefault();

    const {elements: {searchQuery}} = ev.currentTarget;
    const query = searchQuery.value.trim().toLowerCase();

    if (!query) {
        Notify.failure('Please, enter your search details');
        return;
    }
    pixabay.query = query;

    clearPage();

    try {
        const { hits, total } = await pixabay.getPhotos(query);
        if (hits.length === 0) {
            Notify.info('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        renderPhotoGalleryMarkup(hits);
        
        pixabay.calculateTotalHits(total);
        Notify.success(`Hooray! We found ${total} images.`);

        if (pixabay.isShowLoadMore) {
            const target = document.querySelector('.photo-card:last-child');
            observer.observe(target);
        }

        lightbox.refresh();
        
    } catch (error) {
        Notify.failure(error.message, 'Oops, something went wrong!');
        clearPage();
    }
};

function onLoadMoreClick() {
    pixabay.incrementPage();

    if (!pixabay.isShowLoadMore) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info("We're sorry, but you've reached the end of search results.");
    }

    pixabay.getPhotos().then(({ hits }) => {
        renderPhotoGalleryMarkup(hits);
    }).catch(error => {
        Notify.failure(error.message, 'Oops, something went wrong!');
        clearPage();
    });
}

function clearPage() {
    pixabay.resetPage();
    refs.galleryWrapper.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
}
