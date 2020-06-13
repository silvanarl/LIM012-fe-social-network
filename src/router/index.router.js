import { pages } from '../controllers/index.js';

const router = async (route) => {
  const content = document.getElementById('root');
  content.innerHTML = '';

  switch (route) {
    case '':
    case '#':
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
      return content.appendChild(pages.NoFound());
    }
  }
};

export { router };
