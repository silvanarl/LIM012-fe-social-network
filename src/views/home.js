const home = posts => `
<header>
  <div class="header">
    <div>
      <span> name user</span>
      <img src="img/icon-triangleProfile.svg" alt="icon-triangle-menu">
      <img src="img/icon-menu.svg" class="hide" alt="icon-menu">
    </div>
    <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips">
    <a href="#" class="logout"><span>Cerrar Sesión</span></a>
  </div>
</header>
<main>
  <div class="profile">
    <img src="" alt="">
    <img src="" alt="img-profile">
    <img src="" alt="icon-travel">
  </div>
  <div class="post-createPost">
    <div class="container-createPost">
      <div>
        <input class="createPost" type="text" placeholder="¡Comparte tus tips aquí!">
      </div>
      <img src="" alt="createPostAddImage">
      <img src="" alt="createPostPublic">
      <img src="" alt="createPostPrivate">
      <button class="button-createPost">Publicar</button>
    </div>
    <div class="posts">
      <ul class="postPublic" id="publicPost">

        </ul>
      </div>
    </div>
  </div>
</main>
`;

const post = (post) => `
  <li class="postList">
  <h5>${post.title}</h5>
  <p>${post.content}</p>
</li>
`;

export { home, post };
