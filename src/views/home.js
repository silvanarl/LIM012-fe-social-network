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
  <div class="main">
    <div class="profile">
      <img src="" alt="">
      <img src="img/icon-user.svg" alt="img-profile">
      <img src="" alt="icon-travel">
    </div>
    <div class="post-createPost">
      <div class="container-createPost">
        <div>
          <input type="text" placeholder="¡Comparte tus tips aquí!">
        </div>
        <img src="img/icon-addImage.svg" alt="createPostAddImage">
        <img src="img/icon-world.svg" class="icon-world" alt="createPostPublic">
        <img src="" alt="createPostPrivate">
        <button class="button-createPost">Publicar</button>
      </div>
      <div class="posts"
        <ul class = "postPublic">

        </ul>
      </div>
    </div>
  </div>
</main>
`;

const post = post => `
  <div>post : ${post} </div>
`;

export { home, post };
