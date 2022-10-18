import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class PixabayAPI {
    #page = 1;
    #perPage = 10;
    #query = '';
    #totalHits = 0;
    #apiKEY = '?key=30545528-143ee6a3dc060094e4755846c';
    #paramURL = 'image_type=photo&orientation=horizontal&safesearch=true';

    async getPhotos() {
        const urlAXIOS = `${this.#apiKEY}&q=${this.#query}&${this.#paramURL}&page=${this.#page}&per_page=${this.#perPage}`;
        const { data } = await axios.get(urlAXIOS);
        return data;
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

    resetPage() {
        this.#page = 1;
    }

    calculateTotalHits(total) {
        this.#totalHits = Math.ceil(total / this.#perPage);
    }

    get isShowLoadMore() {
        return this.#page < this.#totalHits;
    }
}