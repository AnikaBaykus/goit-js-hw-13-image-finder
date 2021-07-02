import ImagesApiService from './apiService';
import cardImageTpl from '../templates/card-images.hbs';
import ShowMoreBtn from './show-more-btn';

import "@pnotify/core/dist/BrightTheme";
import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify";


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

    fetchHits();   
}

function fetchHits() {
    showMoreBtn.disable(); 
    imagesApiService.fetchHits()
        .then(hits => {
            appendImagesMarkup(hits);
            if (hits.length > 0) {
                showMoreBtn.show();
                showMoreBtn.enable();
            }

            else {
            error({
                text: "Couldn't find anything. Please enter a different value in the search.",
                delay: 500,
                title: "Oops!"
            })
                showMoreBtn.hide();
            }
            
        }).then(()=>scrollGallery())
    
}


function appendImagesMarkup(hits) {
    refs.listImagesEl.insertAdjacentHTML('beforeend', cardImageTpl(hits));
    
}

function clearImagesList() {
    refs.listImagesEl.innerHTML = '';
}

function scrollGallery() {
    if (imagesApiService.page > 2) {
         setTimeout(() => {
            showMoreBtn.refs.button.scrollIntoView({
            behavior: "smooth",
            block: "end",
            });
        },500);
    }
}


