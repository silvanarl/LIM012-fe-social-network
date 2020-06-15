const getPosts = async () => {
  const posts = [];
  await firebase
    .firestore()
    .collection('posts')
    .orderBy('date', 'asc')
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const postData = {
          id: doc.id,
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

const createPost = ({ author, content }) => {
  const time = firebase.firestore().Timestamp.fromDate(new Date());
  firebase.firestore().collection('posts').add({
    author,
    content,
    date: time,
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

export { getPosts, createPost, deletePost, updatePost };
