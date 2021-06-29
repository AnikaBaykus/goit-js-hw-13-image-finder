import ImagesApiService from './apiService';
import cardImageTpl from '../templates/card-images.hbs';
import ShowMoreBtn from './show-more-btn';

const refs = {
    searchImageEl: document.querySelector('#search-form'),
    listImagesEl: document.querySelector('.gallery'),
}

const imagesApiService = new ImagesApiService();
const showMoreBtn = new ShowMoreBtn({
    selector: '[data-action="show-more"]',
    hidden: true,
    });

refs.searchImageEl.addEventListener('submit', onSearchImage);
showMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearchImage(event) {
 event.preventDefault();
    clearImagesList();

    imagesApiService.name = event.currentTarget.elements.query.value.trim();

    imagesApiService.resetPage();
    showMoreBtn.show();

    fetchHits();   
}

function fetchHits() {
    showMoreBtn.disable(); 
    imagesApiService.fetchHits().then(hits =>{
        appendImagesMarkup(hits);
        showMoreBtn.enable();
    });
}


function appendImagesMarkup(hits) {
    refs.listImagesEl.insertAdjacentHTML('beforeend', cardImageTpl(hits));
    scrollGallery();  

}

function clearImagesList() {
    refs.listImagesEl.innerHTML = '';
}

function scrollGallery() {
    showMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    });
}

