import { login } from '../views/login.js';

export default () => {
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
    console.log(email);

    const loginUser = (inputEmail, InputPassword) => {
      console.log('inicio de sesion con', email);

      firebase
        .auth()
        .signInWithEmailAndPassword(inputEmail, InputPassword)
        .then((user) => {
          console.log('usuario logeado', user);
          window.location.hash = '/home';
        })
        .catch(error => console.error(error));
    };

    if (!email && !password) {
      return 'hubo un error';
    }
    return loginUser(email, password);
  });

  return divLogin;
};
