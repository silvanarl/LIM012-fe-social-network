import { registerForm } from '../views/register.js';
import { user, createUser } from '../models/auth.js';

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

    const userName = formRegister.user.value;
    const email = formRegister.email.value;
    const password = formRegister.password.value;

    const regexpEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    const regexpPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    const validationEmail = email.match(regexpEmail);
    const validationPassword = password.match(regexpPassword);

    const addNameInCreateUser = (addName, userEmail, userPassword) => {
      createUser(userEmail, userPassword).then(async () => {
        console.log('addingName', addName);
        const userF = user();
        await userF.updateProfile({
          displayName: addName,
        });
        firebase.firestore().collection('users').doc(userF.uid).set(
          {
            name: addName,
          },
          { merge: true },
        );
        window.location.hash = '/home';
        console.log('adding', user().displayName);
      });
      // .catch(error => console.error(error));
    };
    if (userName && email && password) {
      if (validationEmail === null && validationPassword === null) {
        return 'hubo un error';
      }
    }
    return addNameInCreateUser(userName, email, password);
  });

  return divRegister;
};
