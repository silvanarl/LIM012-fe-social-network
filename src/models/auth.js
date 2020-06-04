const loginUser = (inputEmail, InputPassword) => (
  // console.log('inicio de sesion con', email);
  firebase
    .auth()
    .signInWithEmailAndPassword(inputEmail, InputPassword)
    .then((user) => {
      window.location.hash = '/home';
      return user;
    })
    .catch(error => console.error(error))
);

export { loginUser };
