import { home } from '../views/home.js';

export default () => {
  const divElement = document.createElement('div');

  divElement.innerHTML = home('Maria');

  return divElement;
};
