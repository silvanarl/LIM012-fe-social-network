import { register } from '../views/register.js';

export default () => {
  const divRegister = '';
  const buttonRegister = divRegister.querySelector('.button-register');
  buttonRegister.addEventListener('click', () => {
    window.location.hash = '/home';
  });

  return div;
};
