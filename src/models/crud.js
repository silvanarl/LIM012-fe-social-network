import { user } from './auth.js';

const time = firebase.firestore.Timestamp.fromDate(new Date());

const getUserData = async () => {
  const id = user().uid;
  return firebase.firestore().collection('users').doc(id);
};

const getPosts = callback => firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot(callback);

const createPost = async ({
  photo, author, content, photoURL, postPrivate,
}) => {
  const result = await firebase.firestore().collection('posts').add({
    photo,
    author,
    content,
    userID: user().uid,
    likesUsers: [],
    postPrivate,
    commentsID: [],
    photoURL,
    date: time,
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
  // const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('comments').add({
    photo,
    author,
    content,
    userID: user().uid,
    postID,
    date: time,
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

const changePassword = (password) => {
  const userF = user();
  userF
    .updatePassword(password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
};
const changeProfileImg = async (url) => {
  const userF = user();
  await userF.updateProfile({
    photoURL: url,
  });
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
  changePassword,
  changeProfileImg,
};
