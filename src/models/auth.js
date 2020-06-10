import { auth } from '../firebase-config.js';

const loginUser = (inputEmail, InputPassword) => auth
  .signInWithEmailAndPassword(inputEmail, InputPassword)
  .then((user) => {
    window.location.hash = '/home';
    return user;
  })
  .catch(error => console.error(error));

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).then((user) => {
    console.log('logeado con google');
    window.location.hash = '/home';
    return user;
  });
};

const getCurrentUser = () => firebase.auth().getCurrentUser;

const userStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return 'Usuario no existe';
    }
    return user;
  });
};

export {
  loginUser, loginWithGoogle, userStatus, getCurrentUser,
};
