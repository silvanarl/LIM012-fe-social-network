// import { dataPost } from './crud.js';

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
      firebase.firestore().collection('posts')
        .get()
        .then((snapshot) => {
          console.log(snapshot.docs);
        });
    }
  });
};

export { loginUser, loginWithGoogle, userStatus };
