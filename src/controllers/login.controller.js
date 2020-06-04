import { login } from '../views/login.js';
import loginUser from '../models/auth.js';

const divLogin = document.createElement('div');
divLogin.innerHTML = login;

export const loginUserWithEmail = () => {
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

    if (!email && !password) {
      return 'hubo un error';
    }
    loginUser(email, password);
    return divLogin;
  });
};

// const loginWithGoogle = () => {
//   const buttonGoogle = divLogin.getElementById('button-google');
//   console.log(buttonGoogle);
//   buttonGoogle.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log('click');
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//       .then(() => {
//         console.log('logeado con google');
//       });
//   });
//   return divLogin;
// };
