// Selecciona todos los elementos que tengan las clases de animación
const elementosAnimados = document.querySelectorAll('.fade-in, .slide-up');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observer.unobserve(entrada.target);
    }
  });
}, { threshold: 0.2 });

elementosAnimados.forEach((el) => observer.observe(el));

/* MODO OSCURO */
document.addEventListener("DOMContentLoaded", () => {
  const btnModo = document.getElementById("btnTema");
  const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const stored = localStorage.getItem('darkMode');
  const prefersDark = mediaQuery ? mediaQuery.matches : false;
  const isDark = stored !== null ? (stored === 'true') : prefersDark;

  document.body.classList.toggle('dark-mode', isDark);

  function updateToggleAppearance(enabled) {
    if (!btnModo) return;
    const icon = btnModo.querySelector('i');
    if (enabled) {
      btnModo.classList.remove('btn-outline-light');
      btnModo.classList.add('btn-outline-warning');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
      btnModo.setAttribute('aria-pressed', 'true');
    } else {
      btnModo.classList.remove('btn-outline-warning');
      btnModo.classList.add('btn-outline-light');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
      btnModo.setAttribute('aria-pressed', 'false');
    }
  }

  updateToggleAppearance(document.body.classList.contains('dark-mode'));

  if (btnModo) {
    btnModo.addEventListener('click', () => {
      const enabled = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', String(enabled));
      updateToggleAppearance(enabled);
    });
  }

  if (mediaQuery && stored === null) {
    mediaQuery.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.matches);
      updateToggleAppearance(e.matches);
    });
  }
});

function toggleCard(element) {
  const card = element.parentElement;
  card.classList.toggle('active');
}