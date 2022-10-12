export class PixabayAPI {
    #page = 1;
    #query = '';
    #totalHits = 0;

    getPhotos() {
        const url = `https://pixabay.com/api/?key=30545528-143ee6a3dc060094e4755846c&q=${this.#query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.#page}&per_page=40`;
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }


    set query(newQuery) {
        this.#query = newQuery;
    }
    get query() {
        return this.#query;
    }


    
    incrementPage() {
        this.#page += 1;
    }

    calculateTotalHits(total) {
        this.#totalHits = Math.ceil(total / 40);
    }

    get isShowLoadMore() {
        return this.#page < this.#totalHits;
    }
}