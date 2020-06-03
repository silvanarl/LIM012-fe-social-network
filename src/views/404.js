export default () => {
  const view404 = `
    <h2>404</h2>
    <h1>Página no encontrada</h1>
    <p>El archivo especificado no se encontró en este sitio web. Por favor, compruebe la URL para errores y vuelva a intentarlo.</p>
    `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'message');
  divElemt.innerHTML = view404;
  return divElemt;
};
