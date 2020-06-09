import { router } from './router/index.router.js';
import { initFirebase } from './firebase-config.js';

const init = () => {
  initFirebase();
  router(window.location.hash);

  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};

window.addEventListener('load', init);
