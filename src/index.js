import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('#search-form'),
    galleryWrapper: document.querySelector('.js-gallery'),
    loadMoreBtn:document.querySelector('.js-more'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit (ev) {
    ev.preventDefault();

    const {elements: {searchQuery}} = ev.currentTarget;
    console.log(searchQuery);
}