import { home } from '../views/home.js';

export default () => {
  const divElement = document.createElement('div');

  const user = firebase.auth().currentUser;

  divElement.innerHTML = home(user.email);

  return divElement;
};
