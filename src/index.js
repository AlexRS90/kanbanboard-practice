import './style.css';
import * as rsvtn from './reservations.js';
import * as likeAPI from './likes_involment_api.js'

import  apiCall from './marvel-api-call';//eslint-disable-line
import displayItem from './display-item.js';

let superHeroes = [];
let likesCounter = [];

const displaySHCards = (arraySuperH) => {
  superHeroes = arraySuperH;
  let newCard = '';
  superHeroes.forEach((heroes) => {
    newCard += `<div class="card-container d-flex">
    <img src="${heroes.thumbnail.path}/portrait_fantastic.${heroes.thumbnail.extension}" alt="${heroes.name} pincture">
    <div class="d-flex card-info">
        <h3>${heroes.name}</h3>
        <div class="likes-container d-flex">
            <i class="fas fa-heart" id="like_${heroes.id}"></i>
            <p class="number-likes" id="pLike_${heroes.id}"></p>
        </div>
    </div>
    <input type="button" class="btn-comments main-btn" value="Comments" id="${heroes.id}">
    <input type="button" class="btn-reservation main-btn" value="Reservations" id="${heroes.id}">
    </div>`;
  });
  document.querySelector('.super-heroes-container').innerHTML = newCard;
};

const displayLike = (likeArray) => {
  likesCounter = likeArray;
  setTimeout(() => {
    document.querySelectorAll('.number-likes').forEach((like) => {
    const getId = like.id;
    likesCounter.forEach((find) => {
      if(find.item_id.split('_', 2)[1] === getId.split('_', 2)[1]) {
        if (find.likes === 1) {
          like.innerHTML = find.likes + ' like';
        } else {
          like.innerHTML = find.likes + ' likes';
        }
      }
    });
    });
  }, 500);
};

apiCall();
likeAPI.getLike();

window.onload = setTimeout(() => {
  document.querySelectorAll('.btn-reservation').forEach((el) => {
    el.addEventListener('click', () => {
      rsvtn.create(el.id);
    });
  });

  document.querySelectorAll('.btn-comments').forEach((el) => {
    el.addEventListener('click', () => {
      displayItem(el.id);
    });
  });

  document.querySelectorAll('.fa-heart').forEach((like) => {
    like.addEventListener('click', () => {
      like.style.color = 'red';
      likeAPI.giveLike(like.id);
    });
  });
}, 1000);

export { displaySHCards, displayLike };
