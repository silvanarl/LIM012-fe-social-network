import { home } from '../views/home.js';
import { post } from '../views/posts.js';
import {
  userStatus,
  getCurrentUser,
  logOut,
} from '../models/auth.js';
import { getPosts, createPost } from '../models/crud.js';

export default async () => {
  const divElement = document.createElement('div');
  await userStatus();
  divElement.innerHTML = home();

  let postList = await getPosts();

  const logoutBtn = divElement.querySelector('#logout');
  logoutBtn.addEventListener('click', logOut);
  // para verificar si hay usuario loggueado
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.displayName);
    } else {
      console.log('no hay usuario signed in');
    }
  });


  const listOfPosts = divElement.querySelector('#publicPost');
  postList.forEach((postData) => {
    const child = document.createElement('div');
    child.innerHTML = post(postData);
    listOfPosts.appendChild(child);
  });

  const buttonPost = divElement.querySelector('.button-createPost');

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputPost = divElement.querySelector('.createPost').value;
    const user = await getCurrentUser();
    createPost({ author: '', content: inputPost, title: 'post' });
    postList = await getPosts();
    listOfPosts.innerHTML = '';
    postList.forEach((postData) => {
      const child = document.createElement('div');
      child.innerHTML = post(postData);
      listOfPosts.appendChild(child);
    });
  });

  return divElement;
};
