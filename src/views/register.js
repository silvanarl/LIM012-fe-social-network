const register = () => {
  const registerForm = `<input type="text" placeholder="Nombre de Usuario" class ="input">
  <input type="email" placeholder="E-mail" class ="input">
  <input type="password" placeholder="Contraseña" class ="input">
  <button class="button-register">Registrarme</button>
  `;

  const divRegister = document.createElement('div');
  
  divRegister.innerHTML = registerForm;
  return divRegister;
};

export { register };
