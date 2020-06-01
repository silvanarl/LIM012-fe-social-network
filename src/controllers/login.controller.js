import { login } from '../views/login.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = login;

  const btnClick = divElement.querySelector('#btnClick');
  btnClick.addEventListener('click', () => {
    window.location.hash = '/home';
  });

  return divElement;
};
