import { user } from './auth.js';

const getUserData = async () => {
  const id = user().uid;
  return firebase.firestore().collection('users').doc(id);
};

const getPosts = onSnapshot => firebase.firestore()
  .collection('posts')
  .orderBy('date', 'desc')
  .onSnapshot(onSnapshot);

const createPost = ({
  photo, author, content, photoURL,
}) => {
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('posts').add({
    photo,
    author,
    content,
    date: time,
    userID: user().uid,
    likesUsers: [],
    postPrivate: false,
    commentsID: [],
    photoURL,
  });
};
const addImage = async (id, photo) => {
  await firebase.firestore().collection('posts').doc(id).update({
    photo,
  });
};

const getComments = onSnapshot => firebase.firestore()
  .collection('comments')
  .orderBy('date', 'desc')
  .onSnapshot(onSnapshot);

const createComment = ({
  photo, author, content, postID,
}) => {
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('comments').add({
    photo,
    author,
    content,
    date: time,
    userID: user().uid,
    postID,
  });
};

const deletePost = async (id) => {
  await firebase.firestore().collection('posts').doc(id).delete();
};

const updatePost = async (id, content) => {
  await firebase.firestore().collection('posts').doc(id).update({
    content,
  });
};

const updateLikesUser = async (id, likesUsers) => {
  await firebase.firestore().collection('posts').doc(id).update({
    likesUsers,
  });
};

const updateProfileInfo = async (name, country, aboutMe) => {
  const id = user().uid;
  firebase.firestore().collection('users').doc(id).set(
    {
      name,
      country,
      aboutMe,
    },
    { merge: true },
  );
};
export {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  updateLikesUser,
  getComments,
  createComment,
  updateProfileInfo,
  getUserData,
  addImage,
};
