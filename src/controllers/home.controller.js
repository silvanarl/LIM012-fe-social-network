import { home } from '../views/home.js';
import { post, editingPost, comment } from '../views/posts.js';

import { userStatus, user, logOut } from '../models/auth.js';
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  updateLikesUser,
  getComments,
  createComment,
} from '../models/crud.js';

export default async () => {
  const currentUserUID = user().uid;
  const userName = user().displayName;
  const userPhoto = user().photoURL;

  const onDeleteClick = async (id) => {
    await deletePost(id);
    mapListToScreen();
  };

  // Llenando div con la data de POSTS
  const buildPost = (postData) => {
    const userPostID = postData.userID;
    const child = document.createElement('div');
    child.setAttribute('class', 'containerToContainerPost');
    child.innerHTML = post(postData);

    const btnDelete = child.querySelector('.icon-deletePost');
    const btnEdit = child.querySelector('.icon-editPost');
    const id = btnDelete.getAttribute('data-value');

    // fx de likes
    const buttonLikes = child.querySelector('.btnLikes');
    const arrayLikesUsers = postData.likesUsers;
    buttonLikes.addEventListener('click', async (e) => {
      e.preventDefault();
      if (arrayLikesUsers.includes(currentUserUID)) {
        const indUserArray = arrayLikesUsers.indexOf(currentUserUID);
        arrayLikesUsers.splice(indUserArray, 1);
      } else {
        arrayLikesUsers.push(currentUserUID);
      }
      await updateLikesUser(id, arrayLikesUsers);
      mapListToScreen();
    });


    // Control de crear y ver comentarios
    const buttonViewComment = child.querySelector('.btnComments');
    const listOfComments = child.querySelector('.contentComment');
    const divCreateComment = child.querySelector('.createComment');
    const buttonComment = child.querySelector('.buttonSend');
    buttonViewComment.addEventListener('click', async (e) => {
      e.preventDefault();
      showComments();
      divCreateComment.classList.toggle('hide');
      listOfComments.classList.toggle('hide');
      buttonComment.addEventListener('click', async (event) => {
        event.preventDefault();
        const inputComment = child.querySelector('.textComment').value;
        const postID = postData.id;
        createComment({
          photo: userPhoto,
          author: userName,
          content: inputComment,
          postID,
        });
        mapListToScreen();
        // inputComment.innerHTML = '';
      });
    });
    const buildComment = (dataComment) => {
      const createCommentDivChild = document.createElement('div');
      createCommentDivChild.setAttribute('class', 'containerToContainerComments');
      createCommentDivChild.innerHTML = comment(dataComment);
      return createCommentDivChild;
    };
    const showComments = async () => {
      const postDataID = postData.id;
      const postDataComments = [];
      const commentList = await getComments(postDataID);
      listOfComments.innerHTML = '';
      const dataIdComment = listOfComments.getAttribute('data-id');
      commentList.forEach((dataComment) => {
        if (dataComment.postID === dataIdComment) {
          listOfComments.appendChild(buildComment(dataComment));
          const idComment = dataComment.id;
          postDataComments.push(idComment);
          const newArrCommentsCounter = [...new Set(postDataComments)];
          const spanCounterComments = child.querySelector('.counterComments');
          spanCounterComments.textContent = newArrCommentsCounter.length;
        }
      });
    };

    // INICIO botones de editar y eliminar post
    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      if (userPostID === currentUserUID) {
        onDeleteClick(id);
      }
    });
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      if (userPostID === currentUserUID) {
        mapEditingList(id);
        child.innerHTML = '';
        child.innerHTML = post(postData, true);
      }
    });
    // FIN botones de editar y eliminar post
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
      const userPostID = postData.userID;
      if (postData.postPrivate === false) {
        const child = buildPost(postData);
        listOfPosts.appendChild(child);
      }
      if (userPostID === currentUserUID && postData.postPrivate === true) {
        const child = buildPost(postData);
        listOfPosts.appendChild(child);
      }
    });
  };
  const mapEditingList = async (id) => {
    listOfPosts.innerHTML = '';
    postList = await getPosts();
    console.log(postList);
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
    const inputPost = divElement.querySelector('.createPost');
    createPost({
      photo: userPhoto,
      author: userName,
      content: inputPost.value,
    });
    inputPost.value = '';
    mapListToScreen();
  });

  const btnClickEditProfile = divElement.querySelector('.edit-profile');
  btnClickEditProfile.addEventListener('click', () => {
    window.location.hash = '/profile';
  });
  // FIN de div con la data de HOME

  return divElement;
};
