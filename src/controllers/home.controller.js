import { home } from '../views/home.js';
import {
  post,
  editingPost,
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
  // getComments,
  // createComment,
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

<<<<<<< HEAD
    const buttonViewComment = child.querySelector('.')
    const buttonComment = child.querySelector('.iconSend');
    const createCommentDiv = child.querySelector('.createComment');
    const inputComment = nodeChildComments.querySelector('.textComment');
    buttonComment.addEventListener('click', (e) => {
      e.preventDefault();
      createCommentDiv.classList.remove('hide');
      createComment({
        photo: userPhoto,
        author: userName,
        content: inputComment,
    });
=======
    const buttonLikes = child.querySelector('.btnLikes');
    const numberLikes = child.querySelector('.numberLikes');
    console.log(numberLikes.innerHTML);
    console.log(postData.likes);
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

>>>>>>> 2250d8d4c88a9bc61efa362644badde9f8822b1c
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
  /*
  // const likesPost = (postData) => {
  const child = document.createElement('div');
  child.innerHTML = post(postData);

  const buttonCounterLikes = child.querySelector('.btnLikes');
  const numberLikes = child.querySelector('.numberLike');
  console.log(buttonCounterLikes);
  console.log(numberLikes);
    buttonCounterLikes.addEventListener('click', (e) => {
      e.preventDefault();
    });
    return child;
  };
  */
  // FIN de div con la data de POSTS

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

<<<<<<< HEAD
  // const nodeChildComments = document.createElement('div');
  // const buttonComment = nodeChildComments.querySelector('.iconSend');
  // const inputComment = nodeChildComments.querySelector('.textComment');
  // buttonComment.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   createComment({
  //     photo: userPhoto,
  //     author: userName,
  //     content: inputComment,
  //   });
  // });
=======
  // const buttonComment = divElement;
>>>>>>> 2250d8d4c88a9bc61efa362644badde9f8822b1c

  return divElement;
};
