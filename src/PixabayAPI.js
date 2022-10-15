export class PixabayAPI {
    #page = 1;
    #perPage = 10;
    #query = '';
    #totalHits = 0;

    #baseURL = 'https://pixabay.com/api/?key=30545528-143ee6a3dc060094e4755846c';
    #paramURL = 'image_type=photo&orientation=horizontal&safesearch=true';

    getPhotos = async () => {
        const url = `${this.#baseURL}&q=${this.#query}&${this.#paramURL}&page=${this.#page}&per_page=${this.#perPage}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        

        // return fetch(url).then(response => {
        //     if (!response.ok) {
        //         throw new Error(response.status);
        //     }
        //     return response.json();
        // })
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