import popUp from './pop-up.js';

export const create = async (id) => {
  const character = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&hash=cef440fde913b8756e1db19d5f18cd9e&apikey=580e7d5773a2965034fd7fcd3cad5f53`).then((response) => response.json());
  const charData = character.data.results[0];
  popUp(charData);
};

export function getReservation() {

}
