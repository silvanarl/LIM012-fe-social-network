import { db } from '../firebase-config.js';

const getPosts = async () => {
  const posts = [];
  await db
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const postData = {
          id: doc.id,
          title: doc.data().title,
          author: doc.data().author,
          content: doc.data().content,
          date: doc.data().date,
        };
        posts.push(postData);
        console.log(`${doc.id} => ${doc.data().title}`);
      });
    });
  return posts;
};

const createPost = ({ title, author, content }) => {
  db.collection('posts').add({
    title,
    author,
    content,
  });
};

export { getPosts, createPost };

// export { dataPost };
