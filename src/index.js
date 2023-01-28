import  {getPromisFoto} from './js/getRequest.js';
import  {murkupCardFoto} from './js/murkupListFoto.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


import {refs} from "./js/refsElement.js"
const {galleryEl, form, btnOpenMoreFoto} = refs;

let page = 1;

form.addEventListener("submit", onInputTags )


function onInputTags(e) {

    e.preventDefault();

    page =1;
    galleryEl.innerHTML = "";

    const formData = form.searchQuery.value;
       
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
      
    let inputValue = form.searchQuery.value
        
    getFotoGallery (inputValue, page)
   
}



function getFotoGallery (data, page){

    getPromisFoto(data,page)
    
    .then(fotoItems => {
        const arrayFoto = fotoItems.hits;
        console.log( fotoItems.totalHits)

        if(arrayFoto.length > 0) {
            Notify.success(`Hooray! We found totalHits ${fotoItems.totalHits} images.`)
        }
        

        if(arrayFoto.length === 0) {
            galleryEl.innerHTML = "";
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return
        }

        if (Array.isArray(arrayFoto)) {
            let listMurkup = arrayFoto.map( fotoItem =>
            murkupCardFoto(fotoItem)).join('');
            galleryEl.insertAdjacentHTML("beforeend",listMurkup );
            lightbox.refresh();    
        }
        
                
    })
    .catch(err =>{
        console.error('Error');
       
        return err;
    })
       
     
}

let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    enableKeyboard: true,
});

 
 

