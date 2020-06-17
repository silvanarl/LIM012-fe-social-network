const profile = (data) => `
<div class="profile">
  <div class="photo-edit-profile">
    <img src="${data.userPhoto}" class="photoUser" alt="${data.userName}" />
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

export { profile };
