import { registerForm } from '../views/register.js';

export default () => {
  const divRegister = document.createElement('div');
  divRegister.innerHTML = registerForm;

  const linkRegister = divRegister.querySelector('.button-register');
  linkRegister.addEventListener('click', () => {
    window.location.hash = '/register';
  });

  const formRegister = divRegister.querySelector('.formRegister');
  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = formRegister.user.value;
    const email = formRegister.email.value;
    const password = formRegister.password.value;

    if (user && email && password) {
      return createUser(user, email, password);
    }
  });

  const createUser = (user, email, password) => {
    console.log('creando usuario con nombre:', user);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('usuario creado');
        window.location.hash = '/home';
      })
      .catch((error) => console.error(error));
  };

  return divRegister;
};
