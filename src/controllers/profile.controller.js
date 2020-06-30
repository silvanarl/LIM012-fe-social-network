import { profile } from '../views/profile.js';
import { user, changePassword, changeProfileImg } from '../models/auth.js';
import { updateProfileInfo } from '../models/crud.js';

const validatePassword = (password, confirmPassword) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  password === confirmPassword;
const validatePasswordLength = (password, confirmPassword) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  password.length >= 6 && confirmPassword.length >= 6;

export default async () => {
  const userName = user().displayName;
  const userPhoto = user().photoURL;
  const email = user().email;
  const divEdit = document.createElement('div');
  const data = { userName, userPhoto, email };
  divEdit.innerHTML = profile(data);

  const buttonSaveNewpassword = divEdit.querySelector('.btn-save-password');
  buttonSaveNewpassword.addEventListener('click', (e) => {
    e.preventDefault();
    const inputMainPassword = divEdit.querySelector('#mainPassword');
    const inputConfirmPassword = divEdit.querySelector('#confirmPassword');
    const messageError = divEdit.querySelector('.passwordError');
    const isValid = validatePassword(inputMainPassword.value, inputConfirmPassword.value);
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
  const uploader = divEdit.querySelector('#uploader');
  const fileButton = divEdit.querySelector('#fileSelection');
  const uploadButton = divEdit.querySelector('.button-change-img');

  uploadButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (fileButton.files.length !== 0) {
      const file = fileButton.files[0];
      const storageRef = firebase.storage().ref(`img/${file.name}`);
      const task = storageRef.put(file);
      task.on('state_changed', (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
        if (percentage === 100) {
          snapshot.ref.getDownloadURL().then((url) => {
            changeProfileImg(url);
          });
        }
      });
    }
  });
  const buttonSave = divEdit.querySelector('.btn-save-info');
  buttonSave.addEventListener('click', async (event) => {
    event.preventDefault();
    const inputName = divEdit.querySelector('#editName');
    const inputCountry = divEdit.querySelector('#editCountry');
    const inputAboutYou = divEdit.querySelector('#editAboutYou');
    const messageError = divEdit.querySelector('.infoError');
    await updateProfileInfo(inputName.value, inputCountry.value, inputAboutYou.value);
    if (inputName.value === '' || inputCountry.value === '' || inputAboutYou.value === '') {
      messageError.innerHTML = 'Por favor completa todos los campos';
    } else {
      messageError.innerHTML = 'Los datos fueron guardados exitosamente';
    }
  });
  const returnToHome = divEdit.querySelector('#logoImageProfile');
  returnToHome.addEventListener('click', async (evt) => {
    evt.preventDefault();
    window.location.hash = '#/home';
  });
  return divEdit;
};
