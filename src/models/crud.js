import { user } from './auth.js';

const getPosts = async () => {
  const posts = [];
  await firebase
    .firestore()
    .collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const postData = {
          currentUser: user().uid,
          id: doc.id,
          photo: doc.data().photo,
          author: doc.data().author,
          content: doc.data().content,
          userID: doc.data().userID,
          likesUsers: doc.data().likesUsers,
          date: doc.data().date.toDate().toLocaleString(),
          postPrivate: doc.data().postPrivate,
          commentsID: doc.data().commentsID,
        };
        posts.push(postData);
      });
    });
  return posts;
};

const createPost = ({
  photo,
  author,
  content,
  postPrivate,
}) => {
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('posts').add({
    photo,
    author,
    content,
    date: time,
    userID: user().uid,
    likesUsers: [],
    postPrivate,
    commentsID: [],
  });
};

const getComments = async () => {
  const comments = [];
  await firebase
    .firestore()
    .collection('comments')
    // .where('postID', '==', id)
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const commentData = {
          id: doc.id,
          photo: doc.data().photo,
          author: doc.data().author,
          content: doc.data().content,
          date: doc.data().date.toDate().toLocaleString(),
          userID: doc.data().userID,
        };
        comments.push(commentData);
      });
    });
  return comments;
};

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


export {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  updateLikesUser,
  getComments,
  createComment,
  updatePostPrivate,
};
