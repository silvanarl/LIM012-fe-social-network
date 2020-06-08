import firebaseAuthMock from 'firebase-mock';

const mockauth = new firebaseAuthMock.MockFirebase();
mockauth.autoFlush();
global.firebase = firebaseAuthMock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);
