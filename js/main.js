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


document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. FILTRAGE DYNAMIQUE DES FREELANCES
    // ============================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceItems = document.querySelectorAll('.freelance-item');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Fonction de filtrage
    function filterFreelances(category, searchTerm = '') {
        let visibleCount = 0;
        
        freelanceItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemName = item.querySelector('.card-title')?.textContent?.toLowerCase() || '';
            const itemDesc = item.querySelector('.card-text')?.textContent?.toLowerCase() || '';
            const searchLower = searchTerm.toLowerCase().trim();
            
            // Vérifier la catégorie
            const categoryMatch = category === 'all' || itemCategory === category;
            
            // Vérifier la recherche
            const searchMatch = searchTerm === '' || 
                               itemName.includes(searchLower) || 
                               itemDesc.includes(searchLower);
            
            if (categoryMatch && searchMatch) {
                item.style.display = 'block';
                // Animation d'entrée
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50 + visibleCount * 50);
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Afficher un message si aucun résultat
        const container = document.getElementById('freelanceList');
        let noResultMsg = document.getElementById('noResultMsg');
        
        if (visibleCount === 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement('div');
                noResultMsg.id = 'noResultMsg';
                noResultMsg.className = 'col-12 text-center py-5';
                noResultMsg.innerHTML = `
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>Aucun freelance trouvé</h4>
                    <p class="text-muted">Essayez de modifier vos critères de recherche.</p>
                `;
                container.appendChild(noResultMsg);
            }
            noResultMsg.style.display = 'block';
        } else if (noResultMsg) {
            noResultMsg.style.display = 'none';
        }
    }

    // Gestionnaire des boutons de filtre
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Mise à jour des classes actives
                filterButtons.forEach(b => {
                    b.classList.remove('active', 'btn-primary');
                    b.classList.add('btn-outline-primary');
                });
                
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary', 'active');
                
                const category = this.dataset.category;
                const searchTerm = searchInput ? searchInput.value : '';
                filterFreelances(category, searchTerm);
            });
        });
    }

    // Gestionnaire de recherche
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.dataset.category : 'all';
            filterFreelances(category, searchInput.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const activeFilter = document.querySelector('.filter-btn.active');
                const category = activeFilter ? activeFilter.dataset.category : 'all';
                filterFreelances(category, this.value);
            }
        });
    }

    // Initialisation : afficher tous les freelances
    if (freelanceItems.length > 0) {
        filterFreelances('all', '');
    }

   //validation du formulaire
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const prenomInput = document.getElementById('prenom');
        const nomInput = document.getElementById('nom');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formSuccess = document.getElementById('formSuccess');

        // Fonction de validation d'email avec regex
        function validateEmail(email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        }

        // Fonction de validation d'un champ
        function validateField(input, validator, errorMessage) {
            const value = input.value.trim();
            const isValid = validator(value);
            
            if (!isValid) {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                const feedback = input.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = errorMessage;
                }
                return false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                return true;
            }
        }

        // Validateurs spécifiques
        function validatePrenom(value) {
            return value.length >= 2;
        }

        function validateNom(value) {
            return value.length >= 2;
        }

        function validateEmailField(value) {
            return value.length > 0 && validateEmail(value);
        }

        function validateMessage(value) {
            return value.length >= 20;
        }

        // Validation en temps réel
        if (prenomInput) {
            prenomInput.addEventListener('blur', function() {
                validateField(this, validatePrenom, 'Veuillez entrer votre prénom (minimum 2 caractères).');
            });
        }

        if (nomInput) {
            nomInput.addEventListener('blur', function() {
                validateField(this, validateNom, 'Veuillez entrer votre nom (minimum 2 caractères).');
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateField(this, validateEmailField, 'Veuillez entrer une adresse e-mail valide.');
            });
        }

        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                validateField(this, validateMessage, 'Le message doit contenir au moins 20 caractères.');
            });
        }

        // Validation en temps réel (au input) - seulement si déjà validé
        if (prenomInput) {
            prenomInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                    validateField(this, validatePrenom, 'Veuillez entrer votre prénom (minimum 2 caractères).');
                }
            });
        }

        if (nomInput) {
            nomInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                    validateField(this, validateNom, 'Veuillez entrer votre nom (minimum 2 caractères).');
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                    validateField(this, validateEmailField, 'Veuillez entrer une adresse e-mail valide.');
                }
            });
        }

        if (messageInput) {
            messageInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                    validateField(this, validateMessage, 'Le message doit contenir au moins 20 caractères.');
                }
            });
        }

        // Soumission du formulaire
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Valider tous les champs
            const isPrenomValid = validateField(prenomInput, validatePrenom, 'Veuillez entrer votre prénom (minimum 2 caractères).');
            const isNomValid = validateField(nomInput, validateNom, 'Veuillez entrer votre nom (minimum 2 caractères).');
            const isEmailValid = validateField(emailInput, validateEmailField, 'Veuillez entrer une adresse e-mail valide.');
            const isMessageValid = validateField(messageInput, validateMessage, 'Le message doit contenir au moins 20 caractères.');

            if (isPrenomValid && isNomValid && isEmailValid && isMessageValid) {
                // Simuler l'envoi du formulaire
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Afficher le message de succès
                    formSuccess.classList.remove('d-none');
                    formSuccess.style.display = 'block';
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Supprimer les classes de validation
                    document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                        el.classList.remove('is-valid', 'is-invalid');
                    });
                    
                    // Restaurer le bouton
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Masquer le message après 5 secondes
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                    
                    // Faire défiler vers le haut
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                }, 2000);
            } else {
                // Faire défiler vers le premier champ invalide
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Bouton reset - effacer les validations
        const resetBtn = contactForm.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                setTimeout(() => {
                    document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                        el.classList.remove('is-valid', 'is-invalid');
                    });
                    formSuccess.style.display = 'none';
                }, 10);
            });
        }
    }

});