import { home } from '../views/home.js';
import { userStatus } from '../models/auth.js';

export default async () => {
  const divElement = document.createElement('div');
  await userStatus();
  divElement.innerHTML = home();

  return divElement;

  const postList = document.querySelector('.postPublic');
  const setupPosts = (data) => {
    let postData = '';
    if (data.length) {
      data.forEach((doc) => {
        const post = doc.data();
        const li = `
      <li class="postList">
        <h5>${post.title}</h5>
        <span>${post.date}</span>
        <p>${post.content}</p>
      </li>
    `;
        postData += li;
      });
      postList.innerHTML = postData;
    } else {
      postList.innerHTML = '<h4 class="text-white">Login to See Posts</h4>';
    }
    return postData;
  };
};
