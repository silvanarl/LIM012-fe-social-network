import { home } from '../views/home.js';
import { post, editingPost } from '../views/posts.js';
import { userStatus, getCurrentUser, logOut } from '../models/auth.js';
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from '../models/crud.js';


export default async () => {
  const onDeleteClick = async (id) => {
    await deletePost(id);
    mapListToScreen();
  };
  const buildPost = (postData) => {
    const child = document.createElement('div');
    child.innerHTML = post(postData);

    const btnDelete = child.querySelector('.icon-deletePost');
    const btnEdit = child.querySelector('.icon-editPost');
    const id = btnDelete.getAttribute('data-value');
    btnDelete.addEventListener('click', async (e) => {
      e.preventDefault();
      onDeleteClick(id);
    });
    btnEdit.addEventListener('click', async (e) => {
      e.preventDefault();
      mapEditingList(id);
    });
    return child;
  };

  const buildEditingPost = (postData) => {
    const child = document.createElement('div');
    child.innerHTML = editingPost(postData);

    const btnDelete = child.querySelector('.icon-deletePost');
    const btnEdit = child.querySelector('.icon-savePost');
    const id = btnDelete.getAttribute('data-value');

    btnDelete.addEventListener('click', async (e) => {
      e.preventDefault();
      onDeleteClick(id);
    });
    btnEdit.addEventListener('click', async (e) => {
      e.preventDefault();
      const inputPost = child.querySelector('.inputPost').value;
      await updatePost(id, inputPost);
      mapListToScreen();
    });

    return child;
  };

  const divElement = document.createElement('div');
  await userStatus();
  divElement.innerHTML = home();

  let postList = await getPosts();
  const listOfPosts = divElement.querySelector('#publicPost');

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

  const mapListToScreen = async () => {
    listOfPosts.innerHTML = '';
    postList = await getPosts();
    postList.forEach((postData) => {
      const child = buildPost(postData);
      listOfPosts.appendChild(child);
    });
  };
  const mapEditingList = async (id) => {
    listOfPosts.innerHTML = '';
    postList = await getPosts();
    postList.forEach((postData) => {
      let child;
      if (id === postData.id) {
        child = buildEditingPost(postData);
      } else {
        child = buildPost(postData);
      }
      listOfPosts.appendChild(child);
    });
  };

  mapListToScreen();
  const buttonPost = divElement.querySelector('.button-createPost');

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputPost = divElement.querySelector('.createPost').value;
    const user = await getCurrentUser();
    console.log(user);
    createPost({ author: '', content: inputPost, title: 'cualquiera' });
    mapListToScreen();
  });
  return divElement;
};
