const profile = (data) => {
  // eslint-disable-next-line operator-linebreak
  const photo =
    data.userPhoto !== null
      ? `<img src="${data.userPhoto}" class="photoUserEdit" alt="${data.userName}" />`
      : `<div class="no-photo-edit"> <span>${data.userName[0]}</span></div>`;
  return `
  <div class="header">
    <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips">
    <a href="#" id ="logout"><span>Cerrar Sesión</span></a>
  </div>
  <div class="container-profile">
      <div class="photo-edit-profile">
        ${photo} 
        <button class="button-change-img">Cambiar foto</button> 
        <span class="title-user-edit">${data.userName}</span>
        <span>${data.email}</span>
      </div>
      <div class="info-edit-profile">
        <p>Editar perfil</p>
        <input class="input-edit" type="text" placeholder="País" />
        <input class="input-edit"type="text" placeholder="Sobre tí" />
        <button class="btn-save">Guardar</button>
        <div class="password-profile">
          <p>Cambiar contraseña</p>
          <input class="input-edit" id="mainPassword" type="password" placeholder="Cambiar contraseña" />
          <input class="input-edit" id="confirmPassword" type="password" placeholder="Confirmar contraseña" />
          <button class="btn-save-password">Guardar</button>
          <span class="passwordError"></span>
        </div>
      </div>
    </div>
`;
};

export { profile };
