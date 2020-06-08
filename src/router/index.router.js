import { pages } from '../controllers/index.js';
import { auth } from '../firebase.config.js';

const router = async (route) => {
  const content = document.getElementById('root');
  content.innerHTML = '';

  var user = firebase.auth().currentUser;
  console.log('user', user);
  switch (route) {
    case '#/': {
      return content.appendChild(pages.loginUserWithEmail());
    }
    case '#/home': {
      console.log('logged', user.email);
      if (user.email != null) return content.appendChild(await pages.home());
      window.location.hash = '/';
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
