import { profile } from '../views/profile.js';
import { user, changePassword } from '../models/auth.js';

const validatePassword = (password, confirmPassword) => password === confirmPassword;
const validatePasswordLength = (password, confirmPassword) => password.length >= 6
&& confirmPassword.length >= 6;

export default async () => {
  /* const currentUserUID = user().uid; */
  const userName = user().displayName;
  const userPhoto = user().photoURL;
  const email = user().email;
  const divEdit = document.createElement('div');
  const data = { userName, userPhoto, email };
  divEdit.innerHTML = profile(data);
  console.log('div', divEdit);

  const buttonSaveNewpassword = divEdit.querySelector('.btn-save-password');
  buttonSaveNewpassword.addEventListener('click', (e) => {
    e.preventDefault();
    const inputMainPassword = divEdit.querySelector('#mainPassword');
    const inputConfirmPassword = divEdit.querySelector('#confirmPassword');
    const messageError = divEdit.querySelector('.passwordError');
    const isValid = validatePassword(
      inputMainPassword.value,
      inputConfirmPassword.value,
    );
    const isLengthValid = validatePasswordLength(
      inputMainPassword.value,
      inputConfirmPassword.value,
    );
    if (isValid && isLengthValid) {
      messageError.innerHTML = '';
      changePassword(inputMainPassword.value, inputConfirmPassword.value);
    }
    if (!isValid) {
      messageError.innerHTML = 'Las contraseñas no coinciden';
    } else if (!isLengthValid) {
      messageError.innerHTML = 'La contraseña debe contener al menos 6 caracteres';
    } else {
      messageError.innerHTML = 'La contraseña fue cambiada exitosamente';
    }
  });
  return divEdit;
};
