import ImagesApiService from './apiService';
import cardImageTpl from '../templates/card-images.hbs';


const refs = {
    searchImageEl: document.querySelector('#search-form'),
    listImagesEl: document.querySelector('.gallery'),
    showMoreBtnEl: document.querySelector('[data-action="show-more"]'),
}

const imagesApiService = new ImagesApiService();


refs.searchImageEl.addEventListener('submit', onSearchImage);
refs.showMoreBtnEl.addEventListener('click', onShowMore);


function onSearchImage(event) {
 event.preventDefault();
    clearImagesList();
    imagesApiService.name = event.currentTarget.elements.query.value.trim();
    imagesApiService.resetPage();
    imagesApiService.fetchArticles().then(appendImagesMarkup);
    
}

function onShowMore() {
    imagesApiService.fetchArticles().then(appendImagesMarkup);   
}

function appendImagesMarkup(hits) {
    refs.listImagesEl.insertAdjacentHTML('beforeend', cardImageTpl(hits));
}

function clearImagesList() {
    refs.listImagesEl.innerHTML = '';
}