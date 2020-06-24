const post = (data) => {
  // eslint-disable-next-line operator-linebreak
  const photo = data.photo !== null
    ? `<img src="${data.photo}" class="photoUser" alt="${data.author}" />`
    : `<div class="no-photoPost"> <span>${data.author[0]}</span></div>`;
  return `
<div class="profile-post">
<div class="container-post">
    <div class="user-post">
        ${photo}
        <span class="titleUserPost">${data.author}</span>
        <span class="timeUserPost">${data.date}</span>
        <img src="img/icon-world.svg" class="icon-createPost" alt="createPostPublic">
        <div class="dropdown ${data.userID === data.currentUser ? '' : 'hide'}">
            <img src="img/icon-threeDots.svg" class="icon-dropdown dropbtn" alt="icon dropdown">
            <div class="dropdown-content">
                <img src="img/delete.png" data-value="${data.id}" class="icon-deletePost" alt="icon delete">
                <span class="letter-color"> Eliminar post </span>
                <img src="img/icon-edit.png" class="icon-editPost" alt="icon edit">
                <span class="letter-color"> Editar post </span>
            </div>  
        </div> 
        <div class="${data.userID === data.currentUser ? 'hide' : 'space'}">
        </div> 
    </div> 
    <div class="content-post">
        <p class="data">${data.content}</p>
        <div class="likeAndCommentPost">
            <button class="btnLikes"><img src="img/icon-bagLike.svg" class="icon-contentPost" alt="icon like"></button>
            <span class="numberLikes">${data.likesUsers.length}</span>
            <button class="btnComments"><img src="img/icon-comments.svg" class="icon-contentPost" id="icon-comments" alt="icon comments"></button>
            <span class="counterComments"></span>
            <div class="createComment hide">
                <input class="textComment" type="text" placeholder="Comentar...">
                <button class="buttonSend"><img src="img/iconSend.svg" class="iconSend" alt="icon send comment"></button>
            </div>
            <div class="contentComment hide" data-id="${data.id}">
            </div>
        </div>
     </div>
   </div>
</div>
`;
};

const comment = dataComment => `
<div class="containerComments">
    <div class="user-photo-comment">
        <img src="${dataComment.photo}" class="userPhotoComment" alt="${dataComment.author}">
    </div>
    <div class="mainComment">
        <p class="userComment">${dataComment.author}</p>
        <p class="contentComment">${dataComment.content}</p>
    </div>
    <div class="divTimeComment">
        <span class="timeComment">${dataComment.date}</span>
    </div>
</div>
`;

const editingPost = data => `
<div class="container-post">
    <div class="user-post">
        <span class="titleUserPost">EDITANDO</span>
    </div>
    <div class="content-post">
        <input class="inputPost" placeholder="${data.content}"> </input>
        <div class="likeAndCommentPost">
            <img src="img/delete.png" data-value="${data.id}" class="icon-deletePost" alt="icon delete">
            <img src="img/save.png" class="icon-savePost" alt="icon save">
        </div>
    </div>
`;

export { post, comment, editingPost };
