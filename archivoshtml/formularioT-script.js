// ✅ Inicializar EmailJS
(function () {
  emailjs.init("5hSEIwvwW_P3opzdj"); // Tu Public Key
})();

// Asegurar que los elementos del DOM estén disponibles
window.addEventListener("DOMContentLoaded", function () {
  // ---- Envío del formulario ----
  const form = document.getElementById("formularioEmail");
  const alerta = document.getElementById("alerta");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const proporcionado = document.getElementById('proporcionado').value.trim();
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const lugar_nacimiento = document.getElementById('lugar_nacimiento').value;
        const genero = document.getElementById('genero').value;
        const nacionalidad = document.getElementById('nacionalidad').value.trim();
        const numero_documento = document.getElementById('numero_documento').value.trim();
        const motivo_viaje = document.getElementById('motivo_viaje').value;
        const viaje = document.getElementById('viaje').value;
        const dia = document.getElementById('dia').value;

        // Validación básica
        if (!nombre || !proporcionado || !fecha_nacimiento || !lugar_nacimiento || !genero || !nacionalidad || !numero_documento || !dia) {
            alerta.textContent = "⚠️ Por favor complete todos los campos requeridos.";
            alerta.style.color = "orange";
            return;
        }

        // ---- Enviar con EmailJS (versión 4)
        emailjs.send(
            "service_wcr513g",      // ✅ ID del servicio
            "template_qfns7hm",     // ✅ ID de la plantilla
            {
                nombre: nombre,
                proporcionado: proporcionado,
                fecha_nacimiento: fecha_nacimiento,
                lugar_nacimiento: lugar_nacimiento,
                genero: genero,
                nacionalidad: nacionalidad,
                numero_documento: numero_documento,
                motivo_viaje: motivo_viaje,
                viaje: viaje,
                dia: dia,
                time: new Date().toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' })
            },
            "5hSEIwvwW_P3opzdj"     // Tu Public Key
        )
        .then(() => {
            alerta.textContent = "✅ Tu solicitud fue enviada correctamente. Te contactaremos pronto.";
            alerta.style.color = "green";
            form.reset();
        })
        .catch((error) => {
            console.error("Error EmailJS:", error);
            alerta.textContent = "❌ Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.";
            alerta.style.color = "red";
        });
    });

    // ---- Código existente (idioma, menú, etc.) ----
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    function toggleMenu() {
        if (dropdownMenu) dropdownMenu.classList.toggle('show');
    }

    function closeMenu() {
        if (dropdownMenu) dropdownMenu.classList.remove('show');
    }

    function toggleLanguageDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        if (languageDropdown) languageDropdown.classList.toggle('show');
    }

    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-es][data-en]');
        elements.forEach(el => {
            const text = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
            if (text) el.textContent = text;
        });
        document.title = lang === 'es'
            ? 'Embajada de Estados Unidos en Colombia'
            : 'United States Embassy in Colombia';
        languageToggle.textContent = lang === 'es' ? 'Idioma ▼' : 'Language ▼';
        languageDropdown.classList.remove('show');
        localStorage.setItem('selectedLanguage', lang);
    }

    if (languageToggle) languageToggle.addEventListener('click', toggleLanguageDropdown);
    languageOptions.forEach(opt => {
        opt.addEventListener('click', e => {
            e.preventDefault();
            changeLanguage(opt.getAttribute('data-lang'));
        });
    });
});
