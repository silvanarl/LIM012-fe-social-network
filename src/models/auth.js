const createUser = (inputEmail, inputPassword) => firebase
  .auth()
  .createUserWithEmailAndPassword(inputEmail, inputPassword);

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
      window.location.hash = '/home';
      return user;
    });
};
const user = () => firebase.auth().currentUser;

const userStatus = () => firebase
  .auth().onAuthStateChanged((userExist) => {
    if (!userExist) {
      return 'Usuario no existe';
    }
    return userExist;
  });


const logOut = () => firebase.auth().signOut();

export {
  loginUser,
  loginWithGoogle,
  userStatus,
  user,
  logOut,
  createUser,
};
