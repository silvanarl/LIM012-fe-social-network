const getPosts = async () => {
  const posts = [];
  await firebase
    .firestore()
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const postData = {
          id: doc.id,
          author: doc.data().author,
          content: doc.data().content,
          date: doc.data().date,
        };
        posts.push(postData);
      });
    });
  return posts;
};

const createPost = ({ author, content }) => {
  firebase.firestore().collection('posts').add({
    author,
    content,
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
};
