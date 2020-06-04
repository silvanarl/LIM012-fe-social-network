import Login from '../src/controllers/login.controller.js';
// import firebasemock from '../__mocks__/firebase-mock';
const firebasemock = require('firebase-mock');

const mockauth = firebasemock.MockFirebase();
global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);


describe('login', () => {
  it('debería ser una función', () => {
    expect(typeof Login).toBe('function');
  });
  it('deberia registar un usuario con correo y password', () => {
    firebasemock.create({
      user: 'ben',
      email: 'ben@example.com',
      password: 'examplePass',
    });
    mockauth.auth().autoFlush();
    mockauth.auth().getUserByEmail('ben@example.com').then((user) => {
      console.assert(user, 'ben was created');
    });
  });
});
