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
          likes: doc.data().likes,
          likesUser: doc.data().likesUser,
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

const createPost = ({ photo, author, content }) => {
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('posts').add({
    photo,
    author,
    content,
    date: time,
  });
};

const getComments = async () => {
  const comments = [];
  await firebase
    .firestore()
    .collection('comments')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const commentData = {
          id: doc.id,
          photo: doc.data().photo,
          author: doc.data().author,
          content: doc.data().content,
          date: doc.data().date.toDate().toLocaleString(),
        };
        comments.push(commentData);
      });
    });
  return comments;
};

const createComment = ({ photo, author, content }) => {
  const time = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection('comments').add({
    photo,
    author,
    content,
    date: time,
    // userID: user().uid,
    likes: 0,
    likesUser: false,
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

const updateLikes = async (id, likes) => {
  await firebase.firestore().collection('posts').doc(id).update({
    likes,
  });
};
const updateLikesUser = async (id, likesUser) => {
  await firebase.firestore().collection('posts').doc(id).update({
    likesUser,
  });
};


export {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  updateLikes,
  updateLikesUser,
  getComments,
  createComment,
};
