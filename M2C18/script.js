// Selecciona todos los elementos que tengan las clases de animación
const elementosAnimados = document.querySelectorAll('.fade-in, .slide-up');

// Configuración del observer
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible'); // activa la animación
      observer.unobserve(entrada.target); // deja de observar una vez animado
    }
  });
}, {
  threshold: 0.2 // porcentaje de visibilidad para activar (20%)
});

// Aplica el observer a cada elemento
elementosAnimados.forEach((el) => observer.observe(el));
/*MODOOSCURO*/
document.addEventListener("DOMContentLoaded", () => {
  const btnModo = document.getElementById("modoOscuroBtn");

  btnModo.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
function toggleCard(element) {
  const card = element.parentElement;
  card.classList.toggle('active');
}