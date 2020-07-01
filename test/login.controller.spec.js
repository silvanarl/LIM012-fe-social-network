import '../__mocks__/functionMock.js';
import {
  loginUser,
  loginWithGoogle,
  createUser,
  logOut,
} from '../src/models/auth.js';

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('deberia crear un usuario con nombre de usuario, correo y password', (done) => {
    createUser('Ben', 'ben@example.com', 'examplePass').then((user) => {
      expect(user.email).toBe('ben@example.com');
      done();
    });
  });
});

describe('loginUser', () => {
  it('debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('deberia registar un usuario con correo y password', (done) => {
    loginUser('ben@example.com', 'examplePass').then((user) => {
      expect(user.email).toBe('ben@example.com');
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

describe('Log out', () => {
  it('Cerrar sesión', () => logOut()
    .then((userOut) => {
      expect(userOut).toBe(undefined);
    }));
});
