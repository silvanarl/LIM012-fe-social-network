const login = `
<div class ="container-login">
  <div class="container-backgroundImage">
    <img src="img/fondomoto.svg" alt="icon-roadTips" class="hidden">
  </div>
  <div class="container-form">
        <img id="bagtravelImage" src="img/bagtravel.png" alt="icon-roadTips">
        <img id ="logoImage" src="img/logo.svg" alt="logo-road-tips">
        <form name="formRegister">
            <label for="formRegister">¡Bienvenidx usuarix!</label>
            <input type="email" name="email" placeholder="E-mail" class ="input" required/>
            <input type="password" name="password" placeholder="Contraseña" class ="input" required/>
            <div class="container-button-login">
                <button class="button-login">Iniciar sesión</button>
                <img src="" alt="sello">
            </div>
        </form>
  </div>
  <span>¿No tienes cuenta? <a class="link" href="#/register">Regístrate</a></span>
 </div>`;

export { login };
