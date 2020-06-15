const home = () => `
<header>
  <div class="header">
    <div>
      <div class="hide">
        <span class=""> Fulana Suarez </span>
        <img src="img/icon-triangleProfile.svg" class=""alt="icon-triangle-menu">
      </div>  
      <div class="menu-dropdown">
        <img src="img/icon-menu.svg" class="icon-menu-dropdown menubtn" alt="icon-menu">
          <div class="menu-dropdown-content">
            <div>
              <img src="img/icon-user.svg" data-value="" class="icon-userbtn" alt="icon delete">
              <span class="letter"> Perfil </span>
            </div>
            <div>
              <img src="img/icon-logout.svg" data-value="" class="icon-outbtn" alt="icon delete">
              <a href="#" class="letter" id ="logout"><span>Cerrar Sesión</span></a>
            </div>
          </div> 
      </div>      
    </div>
    <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips">
    <a href="#" id ="logout"><span>Cerrar Sesión</span></a>
  </div>
</header>
<main>
  <div class ="main">
    <div class="profile">
      <div class= "container-profileimg">
        <img src="img/fondo-amigos.png" class="img-fondo" alt="img-fondo">
      </div>
      <div class= "container-profiledata">
        <img src="img/fondo-amigos.png" class="icon-user" alt="img-profile">
        <span class="nameuser">Fulana Suarez</span>
        <img src="img/icon-mochila.svg" class="icon-mochila" alt="icon-mochila">
      </div>
      <div class="profile-bottom">
        <img src="img/moto.png" class="img-back" alt="img-back">
      </div>
    </div>
    <div class ="mainPost">
      <div class="post-createPost">
        <div class="container-createPost">
          <div class="text">
           <textarea class="createPost" type="text" cols="40" rows="5" placeholder="¡Comparte tus tips aquí!"></textarea>
          </div>
          <div id="containerIconsAndButton">
            <div class="icons-createPost">
              <img src="img/icon-addImage.svg" class="icon-addImage" alt="createPostAddImage">
              <img src="img/icon-world.svg" class="icon-world" alt="createPostPublic">
              <img src="img/icon-privacy.svg" class="hide icon-privacy" alt="createPostPriv
            </div> 
            <div class="container-buttonCreatePost">  
              <button class="button-createPost">Publicar</button>
            </div>
          </div>
        </div>
      </div> 
      <div class="posts">
        <ul class="postPublic" id="publicPost">
        </ul>
      </div>
    </div>
</main>
`;

export { home };
