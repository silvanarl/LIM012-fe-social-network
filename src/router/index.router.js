import { pages } from '../controllers/index.js';

const router = (route) => {
  const content = document.getElementById('root');
  content.innerHTML = '';

  switch (route) {
    case '':
    case '#':
    case '#/': content.appendChild(pages.loginUserWithEmail());
      break;
    case '#/home':
      firebase.auth().onAuthStateChanged(async (userX) => {
        if (!userX) {
          window.location.hash = '#/';
        } else {
          content.appendChild(await pages.home());
        }
      });
      break;
    case '#/register': content.appendChild(pages.register());
      break;
    default:
      content.appendChild(pages.NoFound());
      break;
  }
};

export { router };
