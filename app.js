const boton = document.getElementById("saludo");
const mensaje = document.getElementById("mensaje");
 
function mostrarMensaje() {
  mensaje.textContent = "Gracias por visitar Iluminaciones Escorpio";
}
 
boton.addEventListener("click", mostrarMensaje);
