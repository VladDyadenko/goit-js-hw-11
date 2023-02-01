import  {getPromisFoto} from './js/getRequest.js';
import  {murkupCardFoto} from './js/murkupListFoto.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


import {refs} from "./js/refsElement.js"
const {galleryEl, form, btnOpenMoreFoto} = refs;

let page = 1;

btnOpenMoreFoto.classList.add("is-hidden");

form.addEventListener("submit", onInputTags )

function onInputTags(e) {

    e.preventDefault();

    page =1;

    galleryEl.innerHTML = "";

    const formData = form.searchQuery.value.trim();
       
    if (formData.length === 0) {
        galleryEl.innerHTML = "";
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
    } 
    getFotoGallery(formData, page);

}


btnOpenMoreFoto.addEventListener("click", getMoreFoto)

function getMoreFoto(e) {

    page +=1;

    let inputValue = form.searchQuery.value;
    
    getFotoGallery (inputValue, page);

}



function getFotoGallery (data, page){

    getPromisFoto(data,page)
    
    .then(fotoItems => {
        const arrayFoto = fotoItems.hits;

        console.log(fotoItems.totalHits);

        if(arrayFoto.length === 0) {
            
            galleryEl.innerHTML = "";
            btnOpenMoreFoto.classList.add("is-hidden");
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            
        } else {
            
            let listMurkup = arrayFoto.map( fotoItem =>
            murkupCardFoto(fotoItem)).join('');
            galleryEl.insertAdjacentHTML("beforeend",listMurkup );
            lightbox.refresh();  
            btnOpenMoreFoto.classList.remove("is-hidden");                           
            scrollSmoothFoto(page)
                
             
        }
      

        if(arrayFoto.length < 40 && arrayFoto.length >0 ) {
            noFotosToView()
                     
        }

        if(arrayFoto.length > 0 && page === 1) {
            Notify.success(`Hooray! We found totalHits ${fotoItems.totalHits} images.`);
            console.log(fotoItems.hits.length);
        } 
        else if(page > 1){
            let lastFotoToView =  fotoItems.totalHits - (page-1)*40;
            console.log(lastFotoToView);
            Notify.info(`${lastFotoToView} more photos available for viewing.`)
        }  
        
         
    })
    .catch(err =>{
        console.error('Error');
       
        return err;
    })
           
     
}

function noFotosToView(){
    btnOpenMoreFoto.classList.add("is-hidden");
    const messageLastFhoto = `<p class = gallery__massege>We're sorry, but you've reached the end of search results!</p>`
    galleryEl.insertAdjacentHTML("beforeend",messageLastFhoto )
}



function scrollSmoothFoto(data) {

    if(data >1){

        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight +420,
        behavior: "smooth",
        });
    }
    
}


let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    enableKeyboard: true,
});

 
