const post = data => `
<div class="container-post">
    <div class="user-post">
        <span class="titleUserPost">${data.title}</span>
        <span class="timeUserPost">${data.date}</span>
    </div>
    <div class="content-post">
        <p>${data.content}</p>
        <div class="likeAndCommentPost">
            <img src="img/delete.png" data-value="${data.id}" class="icon-deletePost" alt="icon delete">
            <img src="img/icon-comments.svg" class="icon-contentPost" alt="icon comments">
            <img src="img/icon-bagLike.svg" class="icon-contentPost" alt="icon like">
            <img src="img/icon-edit.png" class="icon-editPost" alt="icon edit">
        </div>
    </div>
</div>
`;

const editingPost = data => `
<div class="container-post">
    <div class="user-post">
        <span class="titleUserPost">EDITANDO</span>
        <span class="timeUserPost">${data.date}</span>
    </div>
    <div class="content-post">
        <input class="inputPost" placeholder="${data.content}"> </input>
        <div class="likeAndCommentPost">
            <img src="img/delete.png" data-value="${data.id}" class="icon-deletePost" alt="icon delete">
            <img src="img/save.png" class="icon-savePost" alt="icon save">
        </div>
    </div>
</div>
`;
export { post, editingPost };
