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

    const regexpEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    const regexpPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    const validationEmail = email.match(regexpEmail);
    // console.log(validationEmail);

    const validationPassword = password.match(regexpPassword);
    // console.log(validationPassword);

    if (user && email && password) {
      if ((validationEmail === null) && (validationPassword === null)) {
        return 'hubo un error';
      }
      return createUser(user, email, password);
    }
  });

  const createUser = (user, email, password) => {
    console.log('creando usuario con nombre:', user);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('usuario creado');
      })
      .catch((error => console.error(error)));
  };

  return divRegister;
};
