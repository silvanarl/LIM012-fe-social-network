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
            <img src="img/icon-comments.svg" class="icon-contentPost" alt="icon comments">
            <button data-value="${data.id}" class="button-deletePost">Borrar</button>
        </div>
    </div>
</div>
`;

export { post };
