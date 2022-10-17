export function createPhotoGalleryMarkup (photos) {
    return photos.map(({webformatURL, tags, likes, views, comments, downloads}) => {
        return /*html*/ `<li class="photo-card">
        <a class="link" href="${webformatURL}">
        <img src="${webformatURL}" alt="${tags}" width="270" height="260" loading="lazy" />
        <div class="info">
            <p class="info-item">${likes}
            <b class="info-text">Likes</b>
            </p>
            <p class="info-item">${views}
            <b class="info-text">Views</b>
            </p>
            <p class="info-item">${comments}
            <b class="info-text">Comments</b>
            </p>
            <p class="info-item">${downloads}
            <b class="info-text">Downloads</b>
            </p>
        </div>
        </a>
    </li>`
    }).join('');
}