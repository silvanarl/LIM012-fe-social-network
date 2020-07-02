import { user } from './auth.js';

const getUserData = async () => {
  const id = user().uid;
  return firebase.firestore().collection('users').doc(id);
};

const getPosts = onSnapshot => firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot(onSnapshot);

const createPost = async ({
  photo, author, content, photoURL, postPrivate,
}) => {
  console.log(photo, author, content);
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  const result = await firebase.firestore().collection('posts').add({
    photo,
    author,
    content,
    date: time,
    userID: user().uid,
    likesUsers: [],
    postPrivate,
    commentsID: [],
    photoURL,
  });
  console.log(result);
};
const addImage = async (id, photo) => {
  await firebase.firestore().collection('posts').doc(id).update({
    photo,
  });
};

const getComments = callback => firebase.firestore().collection('comments').orderBy('date', 'desc').onSnapshot(callback);

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

const deleteComment = async (idComment) => {
  await firebase.firestore().collection('comments').doc(idComment).delete();
};

const updatePost = async (id, content) => {
  await firebase.firestore().collection('posts').doc(id).update({
    content,
  });
};

const updateComment = async (id, content) => {
  await firebase.firestore().collection('comments').doc(id).update({
    content,
  });
};

const updatePostPrivate = async (id, postPrivate) => {
  await firebase.firestore().collection('posts').doc(id).update({
    postPrivate,
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
  updatePostPrivate,
  updateProfileInfo,
  getUserData,
  addImage,
  deleteComment,
  updateComment,
};
