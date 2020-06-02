import { login } from '../views/login.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = login;

  const btnClick = divElement.querySelector('.link');
  btnClick.addEventListener('click', () => {
    window.location.hash = '/register';
  });

  return divElement;
};
