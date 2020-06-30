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
  getUserData,
} from '../models/crud.js';

export default async () => {
  const currentUserUID = user().uid;
  const userName = user().displayName;
  const userPhoto = user().photoURL;

  const onDeleteClick = async (id) => {
    await deletePost(id);
  };

  // Llenando div con la data de POSTS
  const buildPost = (postData) => {
    const userPostID = postData.userID;
    const child = document.createElement('div');
    child.setAttribute('class', 'containerToContainerPost');
    child.innerHTML = post(postData);

    const btnDelete = child.querySelector('.iconTextDelete');
    const btnEdit = child.querySelector('.iconTextEdit');
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
        child.innerHTML = '';
        child.innerHTML = editingPost(postData);

        const btnDelete = child.querySelector('.icon-deletePost');
        const btnSave = child.querySelector('.icon-savePost');
        const id = btnDelete.getAttribute('data-value');

        btnDelete.addEventListener('click', async (e) => {
          e.preventDefault();
          onDeleteClick(id);
        });
        btnSave.addEventListener('click', async (e) => {
          e.preventDefault();
          const inputPost = child.querySelector('.inputPost').value;
          await updatePost(id, inputPost);
        });
      }
    });
    // FIN botones de editar y eliminar post
    return child;
  };

  const buildEditingPost = (postData) => {
    const child = document.createElement('div');
    child.innerHTML = editingPost(postData);

    const btnDelete = child.querySelector('.icon-deletePost');
    const btnSave = child.querySelector('.icon-savePost');
    const id = btnDelete.getAttribute('data-value');

    btnDelete.addEventListener('click', async (e) => {
      e.preventDefault();
      onDeleteClick(id);
    });
    btnSave.addEventListener('click', async (e) => {
      e.preventDefault();
      const inputPost = child.querySelector('.inputPost').value;
      await updatePost(id, inputPost);
    });

    return child;
  };
  // FIN de div con la data de POSTS

  // Llenando div con la data de HOME - seccion de publicar
  const divElement = document.createElement('div');
  await userStatus();
  const userData = getUserData();
  const userId = user().uid;
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot.data();
      const arrayOfUserNameDivs = divElement.querySelectorAll('.name-f');
      [].forEach.call(arrayOfUserNameDivs, (div) => {
        // eslint-disable-next-line no-param-reassign
        div.innerHTML = data.name;
      });
      const country = divElement.querySelector('.Country');
      const aboutMe = divElement.querySelector('.aboutMe');
      country.innerHTML = data.country;
      aboutMe.innerHTML = data.aboutMe;
    });

  divElement.innerHTML = home(userData);

  let postList;
  const listOfPosts = divElement.querySelector('#publicPost');

  const logoutBtn = divElement.querySelector('#logout');
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
  });

  getPosts((querySnapshot) => {
    listOfPosts.innerHTML = '';
    querySnapshot.docs.forEach((document) => {
      const id = document.id;
      const doc = document.data();
      const postData = {
        currentUser: user().uid,
        id,
        photo: doc.photo,
        author: doc.author,
        content: doc.content,
        userID: doc.userID,
        likesUsers: doc.likesUsers,
        date: doc.date.toDate().toLocaleString(),
        postPrivate: doc.postPrivate,
        commentsID: doc.commentsID,
        photoURL: doc.photoURL,
      };

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
  });

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

  const buttonPost = divElement.querySelector('.button-createPost');
  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();
    const inputPost = divElement.querySelector('.createPost').value;
    const fileButton = divElement.querySelector('#selectImage');
    if (fileButton.files.length !== 0) {
      const file = fileButton.files[0];
      const storageRef = firebase.storage().ref(`img/${file.name}`);
      const task = storageRef.put(file);
      task.on('state_changed', (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (percentage === 100) {
          snapshot.ref.getDownloadURL().then((url) => {
            console.log('input', inputPost);
            createPost({
              photo: userPhoto,
              author: userName,
              content: inputPost,
              photoURL: url,
            });
          });
        }
        const newInput = divElement.querySelector('.createPost');
        newInput.value = '';
      });
    } else {
      createPost({
        photo: userPhoto,
        author: userName,
        content: inputPost,
        photoURL: '',
      });
      const newInput = divElement.querySelector('.createPost');
      newInput.value = '';
    }
    // FIN de div con la data de HOME
  });
  const btnClickEditProfile = divElement.querySelector('.edit-profile');
  btnClickEditProfile.addEventListener('click', () => {
    window.location.hash = '/profile';
  });
  const hamburguerMenuProfile = divElement.querySelector('#profileHamburguer');
  hamburguerMenuProfile.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '/profile';
  });
  const logoutMenuHam = divElement.querySelector('.logout');
  logoutMenuHam.addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
  });
  return divElement;
};
