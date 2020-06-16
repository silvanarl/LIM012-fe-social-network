import { home } from '../views/home.js';
import {
  post,
  editingPost,
  comment,
} from '../views/posts.js';

import {
  userStatus,
  user,
  logOut,
} from '../models/auth.js';
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  updateLikes,
  updateLikesUser,
  getComments,
  createComment,
} from '../models/crud.js';

export default async () => {
  // const userUid = user().uid;
  const userName = user().displayName;
  // const userEmail = user().email;
  const userPhoto = user().photoURL;

  const onDeleteClick = async (id) => {
    await deletePost(id);
    mapListToScreen();
  };

  // Llenando div con la data de POSTS
  const buildPost = (postData) => {
    const child = document.createElement('div');
    child.innerHTML = post(postData);

    const btnDelete = child.querySelector('.icon-deletePost');
    const btnEdit = child.querySelector('.icon-editPost');
    const id = btnDelete.getAttribute('data-value');

    const buttonLikes = child.querySelector('.btnLikes');
    const numberLikes = child.querySelector('.numberLikes');
    let likeUser = postData.likesUser;
    let total;
    buttonLikes.addEventListener('click', async (e) => {
      e.preventDefault();
      if (likeUser === false) {
        console.log('suma');
        const dataL = postData.likes;
        total = dataL + 1;
        numberLikes.innerHTML = total;
        console.log(total);
        likeUser = true;
      } else if (likeUser === true) {
        console.log('resta');
        const dataL = postData.likes;
        total = dataL - 1;
        numberLikes.innerHTML = total;
        likeUser = false;
      }
      await updateLikes(id, total);
      await updateLikesUser(id, likeUser);
      mapListToScreen();
    });

    const buttonViewComment = child.querySelector('.btnComments');
    const createCommentDiv = child.querySelector('.createComment');
    const buttonComment = child.querySelector('.iconSend');
    buttonViewComment.addEventListener('click', async (e) => {
      e.preventDefault();
      createCommentDiv.classList.toggle('hide');
      console.log('comentario mostrado'); // funciona ok
      const buildComment = (dataComment) => {
        const createCommentDivChild = document.createElement('div');
        createCommentDivChild.innerHTML = comment(dataComment);
      };
      buttonComment.addEventListener('click', (event) => {
        event.preventDefault();
        const inputComment = child.querySelector('.textComment').value;
        console.log(inputComment);
        createComment({
          photo: userPhoto,
          author: userName,
          content: inputComment,
        }); // devuelve undefined, revisa la funcion
      });
    });

    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      onDeleteClick(id);
    });
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      mapEditingList(id);
      child.innerHTML = '';
      child.innerHTML = post(postData, true);
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


  // Llenando div con la data de HOME - seccion de publicar
  const divElement = document.createElement('div');
  await userStatus();
  divElement.innerHTML = home();

  let postList = await getPosts();
  const listOfPosts = divElement.querySelector('#publicPost');

  const logoutBtn = divElement.querySelector('#logout');
  logoutBtn.addEventListener('click', logOut);
  // para verificar si hay usuario loggueado
  firebase.auth().onAuthStateChanged((userExist) => {
    if (userExist) {
      console.log(userExist.displayName);
      console.log(userExist);
      console.log(userExist.uid);
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
  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();
    let inputPost = divElement.querySelector('.createPost').value;
    createPost({
      photo: userPhoto,
      author: userName,
      content: inputPost,
    });
    mapListToScreen();
    inputPost = '';
  });
  // FIN de div con la data de HOME

  // const buttonComment = divElement;

  return divElement;
};
