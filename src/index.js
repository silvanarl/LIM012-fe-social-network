import { router } from './router/index.router.js';

const init = () => {
  router(window.location.hash);

  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};

window.addEventListener('load', init);
