const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
);
