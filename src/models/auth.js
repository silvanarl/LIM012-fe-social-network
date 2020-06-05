const loginUser = (inputEmail, InputPassword) =>
  // console.log('inicio de sesion con', email);
  firebase
    .auth()
    .signInWithEmailAndPassword(inputEmail, InputPassword)
    .then((user) => {
      window.location.hash = '/home';
      return user;
    })
    .catch((error) => console.error(error));

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

export { loginUser, loginWithGoogle };
