import { loginUserWithEmail } from './login.controller.js';
import { showDiv } from './home.controller.js';
import Register from './register.controller.js';

const pages = {
  loginUserWithEmail,
  showDiv,
  register: Register,
};

export { pages };
