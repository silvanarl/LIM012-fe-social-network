const firebasemock = {
  create: credentials => firebase.auth().createUser(credentials),
};

export { firebasemock };
