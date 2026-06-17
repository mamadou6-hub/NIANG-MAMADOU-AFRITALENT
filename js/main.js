// Récupère le thème sauvegardé dans le localStorage du navigateur
const savedTheme = localStorage.getItem('theme');
// Vérifie si le système d'exploitation utilise le mode sombre par défaut
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Applique le thème au chargement de la page
// Si le thème sauvegardé est 'dark' OU (pas de thème sauvegardé ET le système est en mode sombre)
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    // Active le mode sombre en ajoutant l'attribut data-theme="dark" sur la balise html
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    // Active le mode clair par défaut
    document.documentElement.setAttribute('data-theme', 'light');
}

// Fonction pour basculer entre le mode clair et sombre
function toggleTheme() {
    // Récupère le thème actuel
    const currentTheme = document.documentElement.getAttribute('data-theme');
    // Inverse le thème (dark devient light, light devient dark)
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Applique le nouveau thème sur la balise html
    document.documentElement.setAttribute('data-theme', newTheme);
    // Sauvegarde le choix de l'utilisateur dans localStorage
    localStorage.setItem('theme', newTheme);
    
    // Met à jour l'icône du bouton de bascule
    updateThemeIcon(newTheme);
}

// Fonction pour mettre à jour l'icône du bouton de thème
function updateThemeIcon(theme) {
    // Récupère le bouton par son ID
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Sélectionne l'icône appropriée : soleil pour mode sombre, lune pour mode clair
        const icon = theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';
        // Met à jour le HTML du bouton avec la nouvelle icône
        themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
    }
}

// Fonction pour créer et ajouter le bouton Dark Mode dans la navbar
function addThemeToggleButton() {
    // Récupère la liste de navigation (navbar-nav)
    const navbarNav = document.querySelector('.navbar-nav');
    // Vérifie que la navbar existe et que le bouton n'a pas déjà été ajouté
    if (navbarNav && !document.getElementById('themeToggle')) {
     
        // Crée un nouvel élément <li> pour le bouton
        const themeLi = document.createElement('li');
        themeLi.className = 'theme-toggle-li';
        // Ajoute le bouton avec l'icône correspondant au thème actuel
        themeLi.innerHTML = `
            <button id="themeToggle" class="theme-toggle-btn" aria-label="Changer de thème">
                <i class="bi ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}"></i>
            </button>
        `;
        // Ajoute l'élément à la fin de la liste de navigation
        navbarNav.appendChild(themeLi);
        
        // Ajoute un écouteur d'événement sur le bouton pour basculer le thème
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
    }
}

// Fonction pour ajouter un effet de scroll sur la navbar
function initScrollNavbar() {
    // Récupère les éléments de la navbar
    const navbar = document.querySelector('.navbar');
    const navbarHaut = document.querySelector('.navbar-haut');
    
    // Si la navbar n'existe pas, on quitte la fonction
    if (!navbar) return;
    
    // Écoute l'événement scroll sur la fenêtre
    window.addEventListener('scroll', function() {
        // Si le scroll dépasse 50px, on ajoute les classes d'effet
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            if (navbarHaut) {
                navbarHaut.classList.add('navbar-haut-shrink');
            }
        } else {
            // Sinon, on retire les classes d'effet
            navbar.classList.remove('navbar-scrolled');
            if (navbarHaut) {
                navbarHaut.classList.remove('navbar-haut-shrink');
            }
        }
    });
}

// Fonction pour créer et ajouter le bouton retour en haut
function addBackToTopButton() {
    // Crée le bouton en HTML
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Retour en haut');
    // Ajoute le bouton à la fin du body
    document.body.appendChild(backToTop);
    
    // Affiche ou masque le bouton selon la position de scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll vers le haut au clic avec animation fluide
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction pour gérer le menu mobile (burger)
function initMobileMenu() {
    // Récupère le bouton toggler et le menu à afficher/masquer
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Supprime les attributs data-bs-toggle pour éviter les conflits avec Bootstrap
        navbarToggler.removeAttribute('data-bs-toggle');
        navbarToggler.removeAttribute('data-bs-target');
        
        // Ajoute un écouteur pour ouvrir/fermer le menu manuellement
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            navbarCollapse.classList.toggle('show');
        });
        
        // Ferme le menu quand on clique sur un lien (utile sur mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Ajoute le bouton dark mode
    addThemeToggleButton();
    
    // Initialise la navbar au scroll
    initScrollNavbar();
    
    // Ajoute le bouton retour en haut
    addBackToTopButton();
    
    // Initialise le menu mobile
    initMobileMenu();
    
    // Applique l'icône correcte au chargement
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateThemeIcon(currentTheme);
});

// Gestion des animations fade-in et des compteurs
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les éléments à animer avec les classes animation
    const animElements = document.querySelectorAll('.animation, .animation-1, .animation-2, .animation-3, .animation-4');

    if (animElements.length > 0) {
        // Crée un observateur pour détecter l'entrée des éléments dans le viewport
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ajoute la classe visible pour déclencher l'animation fade-in
                    entry.target.classList.add('visible');
                    // Arrête d'observer l'élément une fois animé pour optimiser les performances
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Déclenche quand 10% de l'élément est visible
            rootMargin: '0px 0px -30px 0px' // Marge pour déclencher un peu avant
        });

        // Observe chaque élément
        animElements.forEach(el => fadeObserver.observe(el));
    }

    // Gestion des compteurs animés
    const counters = document.querySelectorAll('.stat-counter');

    if (counters.length > 0) {
        // Crée un observateur pour les compteurs
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Empêche le re-déclenchement de l'animation
                    if (target.dataset.animated === 'true') return;
                    target.dataset.animated = 'true';

                    // Récupère la valeur cible et la durée depuis les attributs data
                    const targetValue = parseInt(target.getAttribute('data-target'), 10);
                    const duration = parseInt(target.getAttribute('data-duration')) || 2000;
                    const startTime = performance.now();

                    // Fonction d'animation qui s'exécute à chaque frame
                    function animateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);

                        // Fonction d'easing pour un effet plus naturel (cubic ease-out)
                        const easedProgress = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.round(easedProgress * targetValue);

                        // Met à jour le texte du compteur
                        target.textContent = currentValue;

                        // Continue l'animation si elle n'est pas terminée
                        if (progress < 1) {
                            requestAnimationFrame(animateCounter);
                        } else {
                            // Assure que la valeur finale est exacte
                            target.textContent = targetValue;
                        }
                    }

                    // Démarre l'animation
                    requestAnimationFrame(animateCounter);
                }
            });
        }, {
            threshold: 0.3, // Déclenche quand 30% de l'élément est visible
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe chaque compteur
        counters.forEach(counter => counterObserver.observe(counter));
    }
});

// Gestion du filtrage des freelances et validation du formulaire
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne les éléments pour le filtrage
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceItems = document.querySelectorAll('.freelance-item');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Fonction principale de filtrage
    function filterFreelances(category, searchTerm = '') {
        let visibleCount = 0;
        
        // Parcourt chaque freelance
        freelanceItems.forEach(item => {
            // Récupère la catégorie du freelance
            const itemCategory = item.dataset.category;
            // Récupère le nom et la description pour la recherche textuelle
            const itemName = item.querySelector('.card-title')?.textContent?.toLowerCase() || '';
            const itemDesc = item.querySelector('.card-text')?.textContent?.toLowerCase() || '';
            const searchLower = searchTerm.toLowerCase().trim();
            
            // Vérifie si la catégorie correspond
            const categoryMatch = category === 'all' || itemCategory === category;
            
            // Vérifie si le terme de recherche est présent dans le nom ou la description
            const searchMatch = searchTerm === '' || 
                               itemName.includes(searchLower) || 
                               itemDesc.includes(searchLower);
            
            if (categoryMatch && searchMatch) {
                // Affiche l'élément avec une animation d'entrée
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                // Délai progressif pour un effet cascade
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50 + visibleCount * 50);
                visibleCount++;
            } else {
                // Masque l'élément
                item.style.display = 'none';
            }
        });

        // Gère l'affichage du message "Aucun résultat"
        const container = document.getElementById('freelanceList');
        let noResultMsg = document.getElementById('noResultMsg');
        
        if (visibleCount === 0) {
            // Crée le message s'il n'existe pas encore
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
                // Met à jour les classes des boutons (actif/inactif)
                filterButtons.forEach(b => {
                    b.classList.remove('active', 'btn-primary');
                    b.classList.add('btn-outline-primary');
                });
                
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary', 'active');
                
                // Applique le filtre avec la catégorie sélectionnée
                const category = this.dataset.category;
                const searchTerm = searchInput ? searchInput.value : '';
                filterFreelances(category, searchTerm);
            });
        });
    }

    // Gestionnaire du bouton de recherche
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.dataset.category : 'all';
            filterFreelances(category, searchInput.value);
        });
    }

    // Gestionnaire de la touche Entrée dans le champ de recherche
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const activeFilter = document.querySelector('.filter-btn.active');
                const category = activeFilter ? activeFilter.dataset.category : 'all';
                filterFreelances(category, this.value);
            }
        });
    }

    // Initialisation : affiche tous les freelances au chargement
    if (freelanceItems.length > 0) {
        filterFreelances('all', '');
    }

    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Récupère tous les champs du formulaire
        const prenomInput = document.getElementById('prenom');
        const nomInput = document.getElementById('nom');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formSuccess = document.getElementById('formSuccess');

        // Fonction de validation d'email avec expression régulière
        function validateEmail(email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        }

        // Fonction générique de validation d'un champ
        function validateField(input, validator, errorMessage) {
            const value = input.value.trim();
            const isValid = validator(value);
            
            if (!isValid) {
                // Ajoute la classe d'erreur Bootstrap
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                // Met à jour le message d'erreur
                const feedback = input.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = errorMessage;
                }
                return false;
            } else {
                // Ajoute la classe de validation Bootstrap
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                return true;
            }
        }

        // Validateurs spécifiques pour chaque champ
        function validatePrenom(value) {
            return value.length >= 2; // Prénom : minimum 2 caractères
        }

        function validateNom(value) {
            return value.length >= 2; // Nom : minimum 2 caractères
        }

        function validateEmailField(value) {
            return value.length > 0 && validateEmail(value); // Email : non vide et format valide
        }

        function validateMessage(value) {
            return value.length >= 20; // Message : minimum 20 caractères
        }

        // Validation au moment où l'utilisateur quitte le champ (blur)
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

        // Validation en temps réel pendant la saisie (seulement si déjà validé une fois)
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

        // Gestion de la soumission du formulaire
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche le rechargement de la page

            // Valide tous les champs
            const isPrenomValid = validateField(prenomInput, validatePrenom, 'Veuillez entrer votre prénom (minimum 2 caractères).');
            const isNomValid = validateField(nomInput, validateNom, 'Veuillez entrer votre nom (minimum 2 caractères).');
            const isEmailValid = validateField(emailInput, validateEmailField, 'Veuillez entrer une adresse e-mail valide.');
            const isMessageValid = validateField(messageInput, validateMessage, 'Le message doit contenir au moins 20 caractères.');

            // Si tous les champs sont valides
            if (isPrenomValid && isNomValid && isEmailValid && isMessageValid) {
                // Simule l'envoi du formulaire
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                // Affiche un spinner pendant l'envoi
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
                submitBtn.disabled = true;

                // Simule un délai d'envoi (2 secondes)
                setTimeout(() => {
                    // Affiche le message de succès
                    formSuccess.classList.remove('d-none');
                    formSuccess.style.display = 'block';
                    
                    // Réinitialise le formulaire
                    contactForm.reset();
                    
                    // Supprime les classes de validation
                    document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                        el.classList.remove('is-valid', 'is-invalid');
                    });
                    
                    // Restaure le bouton
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Masque le message après 5 secondes
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                    
                    // Fait défiler vers le haut du formulaire
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                }, 2000);
            } else {
                // Fait défiler vers le premier champ invalide
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Gestion du bouton reset : efface les validations
        const resetBtn = contactForm.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                // Petit délai pour laisser le temps au formulaire de se réinitialiser
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