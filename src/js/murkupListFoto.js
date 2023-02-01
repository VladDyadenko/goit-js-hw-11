export function murkupCardFoto({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
   return `<div class="photo-card">
   <a class="gallery__item" href="${largeImageURL}"><img class="gallery__image" src=${webformatURL}" alt="${tags}" loading="lazy" width= 250;/></a>
  <div class="info">
      <p class="info__item">
        <b class="info__bold">Likes ${likes}</b>
      </p>
      <p class="info__item">
        <b class="info__bold">Views ${views}</b>
      </p>
      <p class="info__item">
        <b class="info__bold">Comments ${comments}</b>
      </p>
      <p class="info__item">
        <b class="info__bold">Downloads ${downloads}</b>
      </p>
  </div>
  </div>`};


  