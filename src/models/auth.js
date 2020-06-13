
const loginUser = (inputEmail, InputPassword) => firebase.auth()
  .signInWithEmailAndPassword(inputEmail, InputPassword)
  .then((user) => {
    window.location.hash = '/home';
    return user;
  })
  .catch(error => console.error(error));

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then((user) => {
    console.log('logeado con google');
    window.location.hash = '/home';
    return user;
  });
};
const getCurrentUser = () => firebase.auth().currentUser;
let name;
let email;
let photoUrl;
let uid;

if (getCurrentUser !== null) {
  name = getCurrentUser.displayName;
  email = getCurrentUser.email;
  photoUrl = getCurrentUser.photoURL;
  uid = getCurrentUser.uid;
  console.log(name);
  console.log(email);
  console.log(photoUrl);
  console.log(uid);
}


// if (getCurrentUser !== null) {
//   getCurrentUser.providerData.forEach((profile) => {
//     console.log('Provider-specific UID:', profile.uid);
//     console.log('Sign-in provider:', profile.providerId);
//     console.log('Name:', profile.displayName);
//     console.log('Email:', profile.email);
//     console.log('Photo URL:', profile.photoURL);
//   });
// }

// const getCurrentUser = () => firebase.auth().getCurrentUser;
// if (getCurrentUser != null) {
//   const name = getCurrentUser.displayName;
//   const email = getCurrentUser.email;
//   const photoUrl = getCurrentUser.photoURL;
//   console.log(name);
//   console.log(email);
//   console.log(photoUrl);
// }


const userStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return 'Usuario no existe';
    }
    return user;
  });
};

const logOut = () => {
  firebase.auth().signOut().then(() => console.log('funcion logOut en auth'));
};

export {
  loginUser,
  loginWithGoogle,
  userStatus,
  getCurrentUser,
  logOut,
};
