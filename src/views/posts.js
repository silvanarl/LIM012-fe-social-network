const post = data => `
<div class="container-post">
    <div class="user-post">
        <span class="titleUserPost">${data.title}</span>
        <span class="timeUserPost">${data.date}</span>
    </div>
    <div class="content-post">
        <p>${data.content}</p>
        <div class="likeAndCommentPost">
            <img src="img/icon-bagLike.svg" class="icon-contentPost" alt="icon like">
            <span class="counterLikes">1</span>
            <img src="img/icon-comments.svg" class="icon-contentPost" alt="icon comments">
            <span class="counterComments">1</span>
            <div class="createComment">
                <input class="textComment" type="text" placeholder="Comentar...">
                <img src="img/iconSend.svg" class="iconSend" alt="icon send comment">
            </div>
            <div class="contentComment">
                
            </div>
        </div>
    </div>
</div>
`;

const comment = dataComment => `
<div class="containerComments">
    <div class="user-photo">
        <img src="img/icon-color-user.svg" alt="image user comment">
    </div>
    <div class="mainComment">
        <span class="userComment">${dataComment.title}</span>
        <span class="contentComment">${dataComment.content}</span>
    </div>
    <span class="timeComment">${dataComment.date}</span>
</div>
`;

export { post, comment };
