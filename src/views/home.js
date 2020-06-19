import { user } from '../models/auth.js';

const photo = () => {
  return user().photoURL !== undefined
    ? `<img src="${user().photoURL}" class="photoUserProfile" alt="${
      user().displayName
    }" />`
    : `<div class="no-photoProfile"><span>${user().displayName[0].toUpperCase()}</span></div>`;
};
const home = () => `
<header>
  <div class="header">
    <div>
      <div class="hide">
        <span class=""> ${user().displayName} </span>
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
        <div class="profile-box">
          <div class="container-profiledata">
          ${photo()}
            <span class="nameuser">${user().displayName}</span>
            <img src="img/icon-mochila.svg" class="icon-mochila" alt="icon-mochila">
          </div>
            <div class="edit-profile"> 
            <button class="edit-profile"> Editar Perfil </button>
          </div>
        </div>  
      <div class="profile-bottom">
        <img src="img/moto.png" class="img-back" alt="img-back">
      </div>
    </div>
    <div class ="mainPost">
      <div class="post-createPost">
        <div class="container-createPost">
          <div class="text">
           <textarea class="createPost" type="text" cols="0" rows="5" placeholder="¡Comparte tus tips aquí!"></textarea>
          </div>
          <div id="containerIconsAndButton">
            <div class="icons-createPost">
              <img src="img/icon-addImage.svg" class="icon-addImage" alt="createPostAddImage">
              <img src="img/icon-world.svg" class="icon-world publicPost" alt="createPostPublic">
              <img src="img/icon-privacy.svg" class="icon-privacy privatePost hide" alt="createPostPrivate">
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
