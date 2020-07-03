const post = (data) => {
  // eslint-disable-next-line operator-linebreak
  const photo =
    data.photo !== null
      ? `<img src='${data.photo}' class='photoUser' alt='${data.author}' />`
      : `<div class='no-photoPost'> <span>${data.author}</span></div>`;
  const postPhoto = data.photoURL !== ''
    ? `<img src='${data.photoURL}' class='img-post' alt='${data.author}' />`
    : '';
  return `
<div class='container-post ${data.postPrivate === false || (data.userID === data.currentUser && data.postPrivate === true) ? '' : 'hide'}'>
    <div class='user-post'>
        ${photo}
        <span class='titleUserPost'>${data.author}</span>
        <span class='timeUserPost'>${data.date}</span>
        <div class="${data.userID === data.currentUser ? '' : 'hide'}">
            <img src='img/icon-world.svg' class='icon-createPost publicPosted ${data.postPrivate ? 'hide' : ''}' alt='createPostPublic'>
            <img src="img/icon-privacy.svg" class="icon-createPost privatePosted ${data.postPrivate ? '' : 'hide'}" alt="createPostPrivate">
            <div class='dropdown'>
                <img src='img/icon-threeDots.svg' class='icon-dropdown dropbtn' alt='icon dropdown'>
                <div class='dropdown-content'>
                    <div class='iconTextDelete' data-value='${data.id}'>
                        <img src='img/delete.png' data-value='${data.id}' class='icon-deletePost' alt='icon delete'>
                        <span class='letter-color'> Eliminar post </span>
                    </div> 
                    <div class='iconTextEdit' data-value='${data.id}'>
                        <img src='img/icon-edit.png' class='icon-editPost' alt='icon edit'>
                        <span class='letter-color'> Editar post </span>
                    </div>     
                </div>  
            </div> 
        </div> 
        <div class='${data.userID === data.currentUser ? 'hide' : 'space'}'>
        </div> 
    </div> 
    <div class='content-post'>
        <p class='data'>${data.content}</p>
        <textarea class='inputEditPost hide' placeholder='${data.content}'></textarea>
        <div class='saveAndCancelEditPost hide'>
            <button class='cancelEditPost' alt='Cancelar'>Cancelar</button>
            <button data-value='${data.id}' class='saveEditPost' alt='Guardar'>Guardar</button>
        </div>
        ${postPhoto}
        <div class='likeAndCommentPost'>
            <button class='btnLikes'><img src='img/icon-bagLike.svg' class='icon-contentPost' alt='icon like'></button>
            <span class='numberLikes'>${data.likesUsers.length}</span>
            <button class='btnComments'><img src='img/icon-comments.svg' class='icon-contentPost' id='icon-comments' alt='icon comments'></button>
            <span class='counterComments'></span>
            <div class='createComment hide'>
                <input class='textComment' type='text' placeholder='Comentar...'>
                <button class='buttonSend'><img src='img/iconSend.svg' class='iconSend' alt='icon send comment'></button>
            </div>
            <div class='contentComment hide' data-id='${data.id}'>
            </div>
        </div>
    </div>
</div>
`;
};

const comment = dataComment => `
<div class='containerComments'>
    <div class='user-photo-comment'>
        <img src='${dataComment.photo}' class='userPhotoComment' alt='${dataComment.author}'>
    </div>
    <div class='mainComment'>
        <p class='userComment'>${dataComment.author}</p>
        <p class='contentComment'>${dataComment.content}</p>
    </div>
    <div class='divTimeComment'>
        <span class='timeComment'>${dataComment.date}</span>
        <span class='commentEdit' id='edit'> editar </span>
        <span class='commentEdit' id='delete'> eliminar </span>
    </div>
</div>
`;
/*
const editComment = dataComment => `
<div class='containerComments'>
    <div class='user-photo-comment'>
        <img src='${dataComment.photo}' class='userPhotoComment' alt='${dataComment.author}'>
    </div>
    <div class='mainComment'>
        <p class='editing'>Editando comentario</p>
        <p class='userComment'>${dataComment.author}</p>
        <p class='contentComment'>${dataComment.content}</p>
    </div>
    <div class='divTimeComment'>
        <img src='img/delete.png' data-value='${dataComment.id}'
        class='icon-deletePost' alt='icon delete'>
        <img src='img/save.png' class='icon-savePost' alt='icon save'>
    </div>
</div>
`;
*/
export { post, comment };
