const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Appliquer le thème au chargement
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

// Fonction pour basculer le thème
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Mettre à jour l'icône du bouton
    updateThemeIcon(newTheme);
}

// Fonction pour mettre à jour l'icône du thème
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';
        themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
    }
}

// Créer et ajouter le bouton Dark Mode dans la navbar
function addThemeToggleButton() {
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav && !document.getElementById('themeToggle')) {
     
        const themeLi = document.createElement('li');
        themeLi.className = 'theme-toggle-li';
        themeLi.innerHTML = `
            <button id="themeToggle" class="theme-toggle-btn" aria-label="Changer de thème">
                <i class="bi ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}"></i>
            </button>
        `;
        navbarNav.appendChild(themeLi);
        
        
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
    }
}



function initScrollNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarHaut = document.querySelector('.navbar-haut');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            if (navbarHaut) {
                navbarHaut.classList.add('navbar-haut-shrink');
            }
        } else {
            navbar.classList.remove('navbar-scrolled');
            if (navbarHaut) {
                navbarHaut.classList.remove('navbar-haut-shrink');
            }
        }
    });
}



function addBackToTopButton() {
    // Créer le bouton
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTop);
    
    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll vers le haut au clic
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Supprimer l'attribut data-bs-toggle pour éviter les conflits
        navbarToggler.removeAttribute('data-bs-toggle');
        navbarToggler.removeAttribute('data-bs-target');
        
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            navbarCollapse.classList.toggle('show');
        });
        
        // Fermer le menu quand on clique sur un lien (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}



document.addEventListener('DOMContentLoaded', function() {
    // Ajouter le bouton dark mode
    addThemeToggleButton();
    
    // Initialiser la navbar au scroll
    initScrollNavbar();
    
    // Ajouter le bouton retour en haut
    addBackToTopButton();
    
    // Initialiser le menu mobile
    initMobileMenu();
    
    // Appliquer l'icône correcte au chargement
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateThemeIcon(currentTheme);
});



document.addEventListener('DOMContentLoaded', () => {

    
    const animElements = document.querySelectorAll('.animation, .animation-1, .animation-2, .animation-3, .animation-4');

    if (animElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation for performance
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        animElements.forEach(el => fadeObserver.observe(el));
    }

    // ============================================================
    // 2. ANIMATED COUNTERS
    // ============================================================
    const counters = document.querySelectorAll('.stat-counter');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                  
                    if (target.dataset.animated === 'true') return;
                    target.dataset.animated = 'true';

                    
                    const targetValue = parseInt(target.getAttribute('data-target'), 10);
                    const duration = parseInt(target.getAttribute('data-duration')) || 2000;
                    const startTime = performance.now();

                    
                    function animateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);

                        const easedProgress = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.round(easedProgress * targetValue);

                        target.textContent = currentValue;

                        // Continue l'animation
                        if (progress < 1) {
                            requestAnimationFrame(animateCounter);
                        } else {
                            // final compteur
                            target.textContent = targetValue;
                        }
                    }

                    // debuter l'animation
                    requestAnimationFrame(animateCounter);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

});