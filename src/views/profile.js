import { user } from '../models/auth.js';

const profile = (data) => {
  // eslint-disable-next-line operator-linebreak
  const photo = () => (user().photoURL !== undefined
    ? `<img src="${user().photoURL}" class="photoUserEdit" alt="${
      data.userName
    }" />`
    : `<div class="no-photo-edit"> <span>${user().displayName}</span></div>`);

  return `
  <div class="header-profile">
    <img id ="logoImageProfile" src="img/logo-roadtips.svg" alt="logo-road-tips">
    <a href="#"<span id ="logout-profile">Cerrar Sesión</span></a>
  </div>
  <div class="container-profile">
      <div class="photo-edit-profile">
        ${photo()} 
        <input type="file" id="fileSelection" value=""></input>
        <progress id="uploader" value="0" max="100">0%</progress>
        <button class="button-change-img">Subir imagen</button> 
        <span class="title-user-edit">${data.userName}</span>
        <span>${data.email}</span>
      </div>
      <div class="horizontal-line"> </div>
      <div class="info-edit-profile">
        <p>Editar perfil</p>
        <input class="input-edit" id="editName" type="text" placeholder="Cambiar nombre" />
        <input class="input-edit" id="editCountry" type="text" placeholder="País" />
        <input class="input-edit" type="text" id="editAboutYou" placeholder="Sobre tí" />
        <button class="btn-save-info">Guardar</button>
        <span class="infoError"></span>
        <div class="password-profile">
          <p>Cambiar contraseña</p>
          <input class="input-edit" id="mainPassword" type="password" placeholder="Cambiar contraseña" />
          <input class="input-edit" id="confirmPassword" type="password" placeholder="Confirmar contraseña" />
          <button class="btn-save-password">Guardar</button>
          <span class="passwordError"></span>
        </div>
        <div>
        <button class= 'backToHome'>Volver</button>
        </div>
      </div>
    </div>
`;
};

export { profile };
