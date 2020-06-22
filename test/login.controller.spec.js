import '../__mocks__/functionMock.js';
import { loginUser, createUser } from '../src/models/auth.js';

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
