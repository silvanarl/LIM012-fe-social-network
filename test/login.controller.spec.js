import '../__mocks__/functionMock.js';
import {
  loginUser, loginWithGoogle, createUser, logOut, user,
} from '../src/models/auth.js';

//  package.json
// "scripts": {
// "htmlhint": "htmlhint dist/*.html ",
// "eslint": "eslint --ext .js src/ test/",
// "stylelint": "stylelint --aei src/**/*.css",
// "pretest": "npm run htmlhint && npm run eslint && npm run stylelint",

/* */
describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería poder crear un nuevo usuario', (done) => {
    createUser('ben@example.com', 'examplePass').then((newUser) => {
      expect(newUser.email).toBe('ben@example.com');
      expect(newUser.isAnonymous).toBe(false);
      done();
    });
  });
});

describe('loginUser', () => {
  it('debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('deberia registar un usuario con correo y password', (done) => {
    loginUser('ben@example.com', 'examplePass').then((userLog) => {
      expect(userLog.email).toBe('ben@example.com');
      done();
    });
  });
});

describe('loginUser with Google', () => {
  it('debería ser una función', () => {
    expect(typeof loginWithGoogle).toBe('function');
  });
  it('Login with Google', (done) => {
    loginWithGoogle().then((userGoogle) => {
      expect(userGoogle.isAnonymous).toBe(false);
      expect(userGoogle.providerData).toEqual([{ providerId: 'google.com' }]);
      done();
    });
  });
});

describe('Current user', () => {
  it('debería reconocer a current user', () => {
    loginUser('ben@example.com.com', '123456').then(() => {
      expect(user().email).toBe('ben@example.com');
    });
  });
});

describe('Log out', () => {
  it('Cerrar sesión', () => logOut().then((userOut) => {
    expect(userOut).toBe(undefined);
  }));
});
