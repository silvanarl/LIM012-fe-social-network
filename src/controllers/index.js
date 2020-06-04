import { loginUserWithEmail } from './login.controller.js';
import Home from './home.controller.js';
import Register from './register.controller.js';

const pages = {
  loginUserWithEmail,
  home: Home,
  register: Register,
};

export { pages };
