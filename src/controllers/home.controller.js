import { home } from '../views/home.js';
import { post, comment } from '../views/posts.js';
import { userStatus, user, logOut } from '../models/auth.js';
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  updateLikesUser,
  getComments,
  createComment,
  updatePostPrivate,
  getUserData,
  deleteComment,
  updateComment,
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
      const elementsListOfComment = child.querySelectorAll('.containerComments');
      const spanCounterComments = child.querySelector('.counterComments');
      spanCounterComments.textContent = elementsListOfComment.length;
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
        const newInputComment = child.querySelector('.textComment');
        newInputComment.value = '';
      });
    });
    const buildComment = (commentData) => {
      const createCommentDivChild = document.createElement('div');
      createCommentDivChild.setAttribute('class', 'containerToContainerComments');
      createCommentDivChild.innerHTML = comment(commentData);
      const btnDeleteComment = createCommentDivChild.querySelector('.commentDelete');

      const onDeleteClickComment = async (idComment) => {
        await deleteComment(idComment);
      };
      btnDeleteComment.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('eliminando comentario');
        const idDeleteComment = btnDeleteComment.getAttribute('data-value');
        onDeleteClickComment(idDeleteComment);
      });
      // Editar comentarios
      const contentCommentToEdit = createCommentDivChild.querySelector('.dataContentComment');
      const userCommentID = contentCommentToEdit.getAttribute('data-value');
      const inputEditComment = createCommentDivChild.querySelector('.inputEditComment');
      const commentEdit = createCommentDivChild.querySelector('#editComment');
      const saveAndCancelEditComment = createCommentDivChild.querySelector('.saveAndCancelEditComment');
      const cancelEditComment = createCommentDivChild.querySelector('.cancelEditComment');
      const saveEditComment = createCommentDivChild.querySelector('.saveEditComment');
      const idCommentEdit = saveEditComment.getAttribute('data-value');

      commentEdit.addEventListener('click', (event) => {
        event.preventDefault();
        contentCommentToEdit.classList.add('hide');
        inputEditComment.classList.remove('hide');
        saveAndCancelEditComment.classList.remove('hide');
        if (userCommentID === currentUserUID) {
          saveEditComment.addEventListener('click', async (ev) => {
            ev.preventDefault();
            const inputCommentEdited = inputEditComment.value;
            await updateComment(idCommentEdit, inputCommentEdited);
          });
          cancelEditComment.addEventListener('click', (ev) => {
            ev.preventDefault();
            contentCommentToEdit.classList.remove('hide');
            inputEditComment.classList.add('hide');
            saveAndCancelEditComment.classList.add('hide');
          });
        }
      });
      return createCommentDivChild;
    };

    getComments((querySnapshot) => {
      listOfComments.innerHTML = '';
      querySnapshot.docs.forEach((document) => {
        const idC = document.id;
        const doc = document.data();
        const commentData = {
          currentUser: user().uid,
          id: idC,
          photo: doc.photo,
          author: doc.author,
          content: doc.content,
          date: doc.date.toDate().toLocaleString(),
          userID: doc.userID,
          postID: doc.postID,
        };
        const dataIdPostByComment = listOfComments.getAttribute('data-id');
        if (commentData.postID === dataIdPostByComment) {
          listOfComments.appendChild(buildComment(commentData));
        }
      });
    });

    // Eliminar posts
    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      if (userPostID === currentUserUID) {
        onDeleteClick(id);
      }
    });

    // Editar Posts
    const contentToEdit = child.querySelector('.data');
    const inputEditPost = child.querySelector('.inputEditPost');
    const buttonsSaveAndCancelEdit = child.querySelector('.saveAndCancelEditPost');
    const saveEditPost = child.querySelector('.saveEditPost');
    const buttonCancelEdit = child.querySelector('.cancelEditPost');
    const idPostEdit = saveEditPost.getAttribute('data-value');

    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      contentToEdit.classList.add('hide');
      inputEditPost.classList.remove('hide');
      buttonsSaveAndCancelEdit.classList.remove('hide');
      if (userPostID === currentUserUID) {
        saveEditPost.addEventListener('click', async (event) => {
          event.preventDefault();
          const inputPostEdited = inputEditPost.value;
          await updatePost(idPostEdit, inputPostEdited);
        });
        // cancelar editarPost
        buttonCancelEdit.addEventListener('click', (event) => {
          event.preventDefault();
          contentToEdit.classList.remove('hide');
          inputEditPost.classList.add('hide');
          buttonsSaveAndCancelEdit.classList.add('hide');
        });
      }
    });

    // pasando de private a public viceversa en post publicado
    const buttonPublicPosted = child.querySelector('.publicPosted');
    const buttonPrivatePosted = child.querySelector('.privatePosted');
    buttonPublicPosted.addEventListener('click', async (e) => {
      e.preventDefault();
      buttonPublicPosted.classList.toggle('hide');
      buttonPrivatePosted.classList.toggle('hide');
      postIsPrivate = true;
      await updatePostPrivate(id, postIsPrivate);
    });
    buttonPrivatePosted.addEventListener('click', async (e) => {
      e.preventDefault();
      buttonPrivatePosted.classList.toggle('hide');
      buttonPublicPosted.classList.toggle('hide');
      postIsPrivate = false;
      await updatePostPrivate(id, postIsPrivate);
    });
    // FIN pasando de private a public viceversa en post publicado
    return child;
  };

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

  // Inicio mostrar img cargada antes de publicar
  const selectImage = divElement.querySelector('#selectImage');
  const showPicture = divElement.querySelector('#showPicture');
  const btnCancelImg = divElement.querySelector('#btnCancelImg');
  // eslint-disable-next-line no-unused-vars
  let imgFile = '';
  selectImage.addEventListener('change', (e) => {
    // Vista previa de imagen cargada
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      showPicture.src = dataURL;
      // Almacena url en localStorage
      localStorage.setItem('image', dataURL);
    };
    reader.readAsDataURL(input.files[0]);
    imgFile = e.target.files[0];
    // Aparece botón para cancelar imagen
    btnCancelImg.classList.remove('hide');
  });
  // Cancela imagen antes de publicar
  btnCancelImg.addEventListener('click', () => {
    localStorage.removeItem('image');
    showPicture.src = '';
    btnCancelImg.classList.add('hide');
  });
  // Fin mostrar img cargada antes de publicar

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

  // INICIO privacidad de post por publicar
  const buttonPublicPost = divElement.querySelector('.publicPost');
  const buttonPrivatePost = divElement.querySelector('.privatePost');
  let postIsPrivate = false;
  buttonPublicPost.addEventListener('click', async (e) => {
    e.preventDefault();
    buttonPublicPost.classList.toggle('hide');
    buttonPrivatePost.classList.toggle('hide');
    postIsPrivate = true;
  });
  buttonPrivatePost.addEventListener('click', (e) => {
    e.preventDefault();
    buttonPrivatePost.classList.toggle('hide');
    buttonPublicPost.classList.toggle('hide');
    postIsPrivate = false;
  });
  // FIN privacidad de post por publicar

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
            createPost({
              photo: userPhoto,
              author: userName,
              content: inputPost,
              postPrivate: postIsPrivate,
              photoURL: url,
            });
          });
        }
        // Inicio quitar img de la pre visualizacion
        localStorage.removeItem('image');
        showPicture.src = '';
        btnCancelImg.classList.add('hide');
        // Fin quitar img de la pre visualizacion
        const newfileButton = divElement.querySelector('#selectImage');
        newfileButton.value = '';
        const newInput = divElement.querySelector('.createPost');
        newInput.value = '';
      });
    } else {
      createPost({
        photo: userPhoto,
        author: userName,
        content: inputPost,
        postPrivate: postIsPrivate,
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
