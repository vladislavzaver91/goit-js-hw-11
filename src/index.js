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

    clearPage();
    initPade();

    async function initPade() {
        try {
            const data = await pixabay.getPhotos(query);
            console.log(data);
            // if (hits.length === 0) {
            //     Notify.info('Sorry, there are no images matching your search query. Please try again.');
            //     return;
            // }
            
            // renderPhotoGalleryMarkup(hits);
            
            // pixabay.calculateTotalHits(total);
            // Notify.success(`Hooray! We found ${total} images.`);
    
            // if (pixabay.isShowLoadMore) {
            //     refs.loadMoreBtn.classList.remove('is-hidden');
            // }
        } catch (error) {
            Notify.failure(error.message, 'Oops, something went wrong!');
        clearPage();
        }
        
    }

    pixabay.getPhotos(query).then(({ hits, total }) => {
        console.log({ hits, total });

    //     if (hits.length === 0) {
    //         Notify.info('Sorry, there are no images matching your search query. Please try again.');
    //         return;
    //     }
        
    //     renderPhotoGalleryMarkup(hits);
        
    //     pixabay.calculateTotalHits(total);
    //     Notify.success(`Hooray! We found ${total} images.`);

    //     if (pixabay.isShowLoadMore) {
    //         refs.loadMoreBtn.classList.remove('is-hidden');
    //     }
    // }).catch(err => {
    //     Notify.failure(err.message, 'Oops, something went wrong!');
    //     clearPage();
    // });
};

function onLoadMoreClick() {
    pixabay.incrementPage();

    if (!pixabay.isShowLoadMore) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info("We're sorry, but you've reached the end of search results.");
    }

    pixabay.getPhotos().then(({ hits }) => {
        renderPhotoGalleryMarkup(hits);
    }).catch(err => {
        Notify.failure(err.message, 'Oops, something went wrong!');
        clearPage();
    });
}

function clearPage() {
    pixabay.resetPage();
    refs.galleryWrapper.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
}


