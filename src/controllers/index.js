import { loginUserWithEmail } from './login.controller.js';
import Home from './home.controller.js';
import Register from './register.controller.js';
import NoFound from '../views/404.js';

const pages = {
  loginUserWithEmail,
  home: Home,
  register: Register,
  noFound: NoFound,
};

export { pages };
