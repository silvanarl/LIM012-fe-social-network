import { pages } from '../controllers/index.js';

const router = async (route) => {
  const content = document.getElementById('root');
  content.innerHTML = '';

  console.log('route', route);

  switch (route) {
    case '#/': {
      return content.appendChild(pages.loginUserWithEmail());
    }
    case '#/home': {
      return content.appendChild(await pages.showDiv());
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
