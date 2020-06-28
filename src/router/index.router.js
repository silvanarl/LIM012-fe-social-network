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
          console.log(userX);
          const homeDiv = await pages.home();
          console.log(homeDiv);
          content.appendChild(homeDiv);
        }
      });
      break;
    case '#/profile':
      firebase.auth().onAuthStateChanged(async (userX) => {
        if (!userX) {
          window.location.hash = '#/';
        } else {
          console.log(userX);
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
