import { home, post } from '../views/home.js';
import { userStatus, getCurrentUser } from '../models/auth.js';
import { getPosts, createPost } from '../models/crud.js';

export default async () => {
  const divElement = document.createElement('div');
  await userStatus();
  divElement.innerHTML = home();

  let postList = await getPosts();

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
    createPost({ author: user, content: inputPost, title: 'cualquiera' });
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
