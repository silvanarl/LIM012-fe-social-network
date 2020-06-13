import { initFirebase } from './firebase-config.js';
import { router } from './router/index.router.js';


const init = () => {
  initFirebase();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/';
    }
    router(window.location.hash);
  });

  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};

window.addEventListener('load', init);
