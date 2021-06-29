const API_KEY = '22247215-1c12035fc4e9317ec5669aed6';
const URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
    constructor() {
        this.nameImage = '';
        this.page = 1;
     }

    fetchHits() {
        console.log(this);
        const options = {
            URL: URL,
            KEY: API_KEY,
            IMAGE_TYPE:'photo',
            ORIENTATION:'horizontal', 
            PER_PAGE: 12,
        }
            
        return fetch(`${options.URL}?image_type=${options.IMAGE_TYPE}
                &orientation=${options.ORIENTATION}
                &q=${this.nameImage}
                &page=${this.page}
                &per_page=${options.PER_PAGE}
                &key=${options.KEY}`)
                    .then(response => response.json())
                    .then(({hits}) => {
                        this.page += 1;
                        
                        return hits;
                    });
        
    }

    get name() {
        return this.nameImage;
    }

    set name(newName) {
        this.nameImage = newName;
    }

    resetPage() {
        this.page = 1;
    }

}