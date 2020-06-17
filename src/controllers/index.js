import { loginUserWithEmail } from './login.controller.js';
import Home from './home.controller.js';
import Register from './register.controller.js';
import NoFound from '../views/404.js';
import Profile from './profile.controller.js';

const pages = {
  loginUserWithEmail,
  home: Home,
  register: Register,
  noFound: NoFound,
  profile: Profile,
};

export { pages };
