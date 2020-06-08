const login = `
<div class ="container-general">
  <div class="container-backgroundImage">
    <img id="motoBack" src="img/fondomoto.svg" alt="icon-roadTips">
  </div>
  <div class="container-form">
        <img id="bagtravelImage" src="img/bagtravel.png" alt="icon-roadTips">
        <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips">
        <form name="loginRegister" id="loginRegister" class="container-form">
          <label for="formGreeting">¡Bienvenidx usuarix!</label>
            <input type="email" name="email" placeholder="E-mail" class ="input" required/>
            <input type="password" name="password" placeholder="Contraseña" class ="input" required/>
            <button type="submit" class="button-login">Iniciar sesión</button>
        </form>
        <div class="option">
          <span class="line"></span>
          <span id="or">O</span>
          <span class="line"></span>
        </div>
        <div class="loginGoogle">
          <button id="button-google">Continuar con google</button>
          <img id="google-icon" src="img/selloGmail.svg" alt="selloGoogle" />
        </div>
    <span>¿No tienes cuenta? <a class="link" href="#/register">Regístrate</a></span>             
  </div>
</div>`;

export { login };
