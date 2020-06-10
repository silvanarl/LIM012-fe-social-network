export default () => {
  const view404 = `
  <header>
    <div class="header">
      <img id ="logoImage" src="img/logo-roadtips.svg" alt="logo-road-tips"/>
    </div>
  </header>  
    <img class="imgNoFound" src="img/img404.png" alt="image page no found"/>
    <h1>Página no encontrada</h1>
    <p>El archivo especificado no se encontró en este sitio web. Por favor, compruebe la URL para errores y vuelva a intentarlo.</p>
  `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'message');
  divElemt.innerHTML = view404;
  return divElemt;
};
