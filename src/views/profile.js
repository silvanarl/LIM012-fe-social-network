function profile(data) {
  // eslint-disable-next-line operator-linebreak
  const photo =
    data.userPhoto === undefined
      ? `<img src="${data.userPhoto}" class="photoUser" alt="${data.userName}" />`
      : `<div class="no-photo-edit"> <span>${data.userName[0]}</span></div>`;
  return `
  <div class="header">
    <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips">
    <a href="#" id ="logout"><span>Cerrar Sesión</span></a>
  </div>
  <div class="container-profile">
      <div class="photo-edit-profile">
        ${photo}
        <span class="titleUserPost">${data.userName}</span>
        <span>${data.email}</span>
      </div>
      <div class="info-edit-profile">
        <p>Editar perfil</p>
        <input type="text" placeholder="País" />
        <input type="text" placeholder="Sobre tí" />
        <button class="btn-save">Guardar</button>
        <p>Cambiar contraseña</p>
        <div class="password-profile">
          <input type="password" placeholder="Cambiar contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
          <button class="btn-save-password">Guardar</button>
        </div>
      </div>
    </div>
`;
}

export { profile };
