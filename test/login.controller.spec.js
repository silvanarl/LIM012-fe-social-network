import '../__mocks__/functionMock.js';
import { loginUser } from '../src/models/auth.js';

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
