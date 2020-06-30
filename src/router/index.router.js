import { pages } from '../controllers/index.js';

const router = (route) => {
  const content = document.getElementById('root');
  content.innerHTML = '';

  switch (route) {
    case '':
    case '#':
    case '#/':
      content.appendChild(pages.loginUserWithEmail());
      break;
    case '#/home':
      firebase.auth().onAuthStateChanged(async (userX) => {
        if (!userX) {
          window.location.hash = '#/';
        } else {
          const homeDiv = await pages.home();
          content.appendChild(homeDiv);
        }
      });
      break;
    case '#/profile':
      firebase.auth().onAuthStateChanged(async (userX) => {
        if (!userX) {
          window.location.hash = '#/';
        } else {
          const profileDiv = await pages.profile();
          content.appendChild(profileDiv);
        }
      });
      break;

    case '#/register':
      content.appendChild(pages.register());
      break;
    default:
      content.appendChild(pages.NoFound());
      break;
  }
};

export { router };
