import { register } from '../views/register.js';

const divRegister = document.createElement('div');
divRegister.innerHTML = registerForm;
return divRegister;
export default () => {
  const divRegister = '';
  const buttonRegister = register.divRegister.querySelector('.button-register');
  buttonRegister.addEventListener('click', () => {
    window.location.hash = '/home';
  });

  return divRegister;
};
