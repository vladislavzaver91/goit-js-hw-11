export function createPhotoGalleryMarkup (photos) {
    return photos.map(({webformatURL, tags, likes, views, comments, downloads}) => {
        return /*html*/ `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">${likes}
            <b>Likes</b>
            </p>
            <p class="info-item">${views}
            <b>Views</b>
            </p>
            <p class="info-item">${comments}
            <b>Comments</b>
            </p>
            <p class="info-item">${downloads}
            <b>Downloads</b>
            </p>
        </div>
    </div>`
    }).join('');
}