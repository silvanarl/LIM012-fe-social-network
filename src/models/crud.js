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
          id: doc.id,
          photo: doc.data().photo,
          author: doc.data().author,
          content: doc.data().content,
          date:
            doc.data().date != null
              ? doc.data().date.toDate().toLocaleDateString()
              : '',
        };
        posts.push(postData);
      });
    });
  return posts;
};

const quantityLikes = () => {
  
};

const createPost = ({ photo, author, content }) => {
  console.log(photo);
  const photoUser = user().photoURL;
  console.log(photoUser);
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('posts').add({
    photo: photoUser,
    author,
    content,
    date: time,
    userID: user().uid,
    likes: 3,
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

export {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  quantityLikes,
};
