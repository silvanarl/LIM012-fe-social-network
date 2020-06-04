import loginUser from '../src/models/auth.js';
// import firebasemock from '../__mocks__/firebase-mock';
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);


describe('loginUser', () => {
  it('debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('deberia registar un usuario con correo y password', () => {
    // firebasemock.create({
    //   user: 'ben',
    //   email: 'ben@example.com',
    //   password: 'examplePass',
    // });
    loginUser('ben@example.com', 'examplePass').then((user) => {
      expect(user.email).toBe('ben@example.com');
    });
  });
});
