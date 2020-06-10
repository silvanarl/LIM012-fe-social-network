// import '../__mocks__/functionMock';

const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAmHvye9yUUr9yEuZVtp2X06zO1MhNuE_8',
    authDomain: 'roadtips-513c4.firebaseapp.com',
    databaseURL: 'https://roadtips-513c4.firebaseio.com',
    projectId: 'roadtips-513c4',
    storageBucket: 'roadtips-513c4.appspot.com',
    messagingSenderId: '314087993993',
    appId: '1:314087993993:web:68893283686c982460cc58',
    measurementId: 'G-PJTL3H0VRK',
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

initFirebase();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
