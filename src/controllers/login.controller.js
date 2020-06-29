import { login } from '../views/login.js';
import { loginUser, loginWithGoogle } from '../models/auth.js';

export const loginUserWithEmail = () => {
  const divLogin = document.createElement('div');
  divLogin.innerHTML = login;
  const btnClick = divLogin.querySelector('.link');
  btnClick.addEventListener('click', () => {
    window.location.hash = '/register';
  });

  const loginRegister = divLogin.querySelector('#loginRegister');
  loginRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginRegister.email.value;
    const password = loginRegister.password.value;

    if (!email && !password) {
      return 'hubo un error';
    }
    return loginUser(email, password);
  });

  const buttonGoogle = divLogin.querySelector('#button-google');
  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle();
  });

  return divLogin;
};
