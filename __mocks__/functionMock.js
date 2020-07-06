const firebasemock = require('firebase-mock');
const firestoremock = require('mock-cloud-firestore');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);
