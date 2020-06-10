const home = () => `
<header>
  <div class="header">
    <div>
      <span class="hide"> name user</span>
      <img src="img/icon-triangleProfile.svg" class="hide"alt="icon-triangle-menu">
      <img src="img/icon-menu.svg" class="icon-menu" alt="icon-menu">
    </div>
    <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips">
    <a href="#" class="hide"><span>Cerrar Sesión</span></a>
  </div>
</header>
<main>
  <div class ="main">
    <div class="profile">
      <img src="" class="hide" alt="">
      <img src="img/icon-color-user.svg" class="hide" alt="img-profile">
      <img src="" class="hide" alt="icon-travel">
    </div>
    <div class="post-createPost">
      <div class="container-createPost">
        <div>
          <input class="createPost" type="text" size="30" placeholder="¡Comparte tus tips aquí!">
        </div>
        <div id="containerIconsAndButton">
          <div class="icons-createPost">
            <img src="img/icon-addImage.svg" class="icon-createPost" alt="createPostAddImage">
            <img src="img/icon-world.svg" class="icon-createPost" alt="createPostPublic">
            <img src="img/icon-privacy.svg" class="hide icon-createPost" alt="createPostPrivate">
          </div> 
          <div class="container-buttonCreatePost">  
            <button class="button-createPost">Publicar</button>
          </div>
        </div>
      </div>
      <div class="posts">
        <ul class="postPublic" id="publicPost">
        </ul>
      </div>
    </div>
  </div>
</main>
`;

export { home };
