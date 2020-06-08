import { pages } from '../controllers/index.js';
// import { auth } from '../firebase.config.js';

const router = async (route) => {
  const content = document.getElementById('root');
  content.innerHTML = '';

  const user = firebase.auth().currentUser;
  console.log('user', user);
  switch (route) {
    case '#/': {
      return content.appendChild(pages.loginUserWithEmail());
    }
    case '#/home': {
      return content.appendChild(await pages.home());
    }
    case '#/register': {
      return content.appendChild(pages.register());
    }
    default: {
      return content.appendChild(pages.loginUserWithEmail());
    }
  }
};

export { router };
