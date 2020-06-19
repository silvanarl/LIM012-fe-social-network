const createUser = async (inputUser, inputEmail, inputPassword) => {
  console.log('creando usuario con nombre:', inputUser);

  await firebase
    .auth()
    .createUserWithEmailAndPassword(inputEmail, inputPassword)
    .then(async () => {
      console.log('usuario creado');
      const userF = user();
      await userF.updateProfile({
        displayName: inputUser,
      });
      window.location.hash = '/home';
    })
    .catch(error => console.error(error));
};

const loginUser = (inputEmail, InputPassword) => firebase.auth()
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
const user = () => firebase.auth().currentUser;

const userStatus = () => {
  firebase.auth().onAuthStateChanged((userExist) => {
    if (!userExist) {
      return 'Usuario no existe';
    }
    return userExist;
  });
};

const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('funcion logOut en auth'));
};

const changePassword = (password) => {
  const userF = user();
  userF.updatePassword(password).then((result) => {
    console.log('result', result);
  }).catch((error) => {
    console.error(error);
  });
};
export {
  loginUser,
  loginWithGoogle,
  userStatus,
  user,
  logOut,
  createUser,
  changePassword,
};
