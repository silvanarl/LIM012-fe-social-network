const registerForm = `
<div class ="container-register">
  <img src="img/bagtravel.png" alt="icon-roadTips">
  <img src="img/logo.svg" alt="logo-road-tips">
  <form name="formRegister" class="formRegister">
    <label for="formRegister">¡Bienvenidx usuarix!</label>
      <input type="text" name="user" placeholder="Nombre de Usuario" class ="input">
      <input type="email" name="email" placeholder="E-mail" class ="input" required/>
      <input type="password" name="password" placeholder="Contraseña" class ="input" required/>
      <div class="container-button-register">
        <button class="button-register">Registrarme</button>
        <img src="" alt="sello">
      </div>
  </form>
 </div> 
`;

export { registerForm };
