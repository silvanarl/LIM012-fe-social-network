import { register } from '../views/register.js';

export default () => {
  const divRegister = '';
  const buttonRegister = register.divRegister.querySelector('.button-register');
  buttonRegister.addEventListener('click', () => {
    window.location.hash = '/home';
  });

  return divRegister;
};
