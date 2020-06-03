import { login } from '../views/login.js';

export default () => {
  const divLogin = document.createElement('div');
  divLogin.innerHTML = login;

  const btnClick = divLogin.querySelector('.link');
  btnClick.addEventListener('click', () => {
    window.location.hash = '/register';
  });

  const buttonLogin = divLogin.querySelector('.button-login');
  const loginRegister = divLogin.querySelector('#loginRegister');
  loginRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginRegister.email.value;
    const password = loginRegister.password.value;
    console.log(email);
    if (email && password) {
      return loginUser(email, password);
    }
  });

  return divLogin;
};

const loginUser = (email, password) => {
  console.log('inicio de sesion con', email);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('usuario logeado', user);
      window.location.hash = '/home';
    })
    .catch((error) => console.error(error));
};
