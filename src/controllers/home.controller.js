import { home } from '../views/home.js';
import { post } from '../views/posts.js';
import { userStatus, getCurrentUser } from '../models/auth.js';
import { getPosts, createPost, deletePost} from '../models/crud.js';

export default async () => {
  const divElement = document.createElement('div');
  await userStatus();
  divElement.innerHTML = home();

  let postList = await getPosts();

  const listOfPosts = divElement.querySelector('#publicPost');
  postList.forEach((postData) => {
    const child = document.createElement('div');
    child.innerHTML = post(postData);
    let btnDelete = child.querySelector('.button-deletePost');
    btnDelete.addEventListener('click', async (e) => {
      e.preventDefault();
      let id = btnDelete.getAttribute("data-value");
      onDeleteClick(id);
    })
    listOfPosts.appendChild(child);
  });

  const onDeleteClick = async (id) => {
    deletePost(id);
    let postList = await getPosts();
    listOfPosts.innerHTML = '';
    postList.forEach((postData) => {
      const child = document.createElement('div');
      child.innerHTML = post(postData);
      let btnDelete = child.querySelector('.button-deletePost');
      btnDelete.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = btnDelete.getAttribute("data-value");
        onDeleteClick(id);
      })
      listOfPosts.appendChild(child);
    });
  }

  const buttonPost = divElement.querySelector('.button-createPost');

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputPost = divElement.querySelector('.createPost').value;
    const user = await getCurrentUser();
    createPost({ author: '', content: inputPost, title: 'cualquiera' });
    postList = await getPosts();
    listOfPosts.innerHTML = '';
    postList.forEach((postData) => {
      const child = document.createElement('div');
      child.innerHTML = post(postData);
      let btnDelete = child.querySelector('.button-deletePost');
      btnDelete.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = btnDelete.getAttribute("data-value");
        onDeleteClick(id);
      })
      listOfPosts.appendChild(child);
    });
  });

  return divElement;
};
