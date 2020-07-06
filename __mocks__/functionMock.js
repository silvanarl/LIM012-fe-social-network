const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

const firestore = () => ({
  collection: () => ({
    add: () => new Promise((resolve) => {
      resolve('la nota se agregó');
    }),
  }),
});

const firebase = {
  firestore,
};

export default jest.fn(() => firebase);
