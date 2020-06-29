const createUser = async (inputUser, inputEmail, inputPassword) => {
  console.log('creando usuario con nombre:', inputUser);

  await firebase
    .auth()
    .createUserWithEmailAndPassword(inputEmail, inputPassword)
    .then(async () => {
      const userF = user();
      await userF.updateProfile({
        displayName: inputUser,
      });
      firebase.firestore().collection('users').doc(userF.uid).set(
        {
          name: inputUser,
        },
        { merge: true },
      );
      window.location.hash = '/home';
    })
    .catch(error => console.error(error));
};

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
  userF
    .updatePassword(password)
    .then((result) => {
      console.log('result', result);
    })
    .catch((error) => {
      console.error(error);
    });
};
const changeProfileImg = async (url) => {
  const userF = user();
  await userF.updateProfile({
    photoURL: url,
  });
};
export {
  changeProfileImg,
  loginUser,
  loginWithGoogle,
  userStatus,
  user,
  logOut,
  createUser,
  changePassword,
};
