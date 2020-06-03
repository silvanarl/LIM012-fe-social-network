const registerForm = `
<div class ="container-general">
  <div class="container-backgroundImage">
    <img id="motoBack" src="img/fondomoto.svg" alt="icon-roadTips">
  </div>
  <div class="container-form">
    <img id= "bagtravelImage" src="img/bagtravel.png" alt="icon-roadTips">
    <img id ="logoImage" src="img/logo.svg" alt="logo-road-tips">
    <form name="formRegister" class="container-form formRegister">
      <label for="formGreeting" >¡Registrate en nuestra red de viajerxs!</label>
        <input type="text" name="user" placeholder="Nombre de Usuario" class ="input">
        <input type="email" name="email" placeholder="E-mail" class ="input" required/>
        <input type="password" name="password" placeholder="Contraseña" class ="input" required/>
        <div class="container-button-register">
        <button class="button-register">Registrarme</button>
        <img src="img/selloCorreo.svg" alt="selloCorreo">
      </div>
  </form>
 </div> 
`;

export { registerForm };
