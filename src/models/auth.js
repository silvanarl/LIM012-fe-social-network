// import { dataPost } from './crud.js';

import { db } from '../firebase.config.js';

const loginUser = (inputEmail, InputPassword) => firebase
  .auth()
  .signInWithEmailAndPassword(inputEmail, InputPassword)
  .then((user) => {
    window.location.hash = '/home';
    return user;
  })
  .catch(error => console.error(error));

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((user) => {
      console.log('logeado con google');
      window.location.hash = '/home';
      return user;
    });
};

const userStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('posts')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().title}`);
          });
        })
        .catch(error => console.log('no hay usuario activo', error));
    }
  });
};

export { loginUser, loginWithGoogle, userStatus };
