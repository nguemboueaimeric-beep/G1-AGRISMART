// AgriSmart - Script principal pour les fonctionnalités interactives

// Fonction d'initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('AgriSmart - Site web chargé');
    
    // Initialisation des composants
    initNavigation();
    initMoistureFeature();
    initWaterLevelFeature();
    initIrrigationFeature();
    initLightControlFeature();
    initDashboard();
    initCarousel();
    initContactForm();
    
    // Animation au défilement
    initScrollAnimations();
});

// Navigation responsive
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Fonctionnalité 1 : Vérification de l'humidité du sol
function initMoistureFeature() {
    const moistureValue = document.getElementById('moistureValue');
    const moistureFill = document.getElementById('moistureFill');
    const simulateBtn = document.getElementById('simulateMoisture');
    
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            // Générer une valeur aléatoire entre 30% et 90%
            const newMoisture = Math.floor(Math.random() * 60) + 30;
            
            // Mettre à jour l'affichage
            moistureValue.textContent = `${newMoisture}%`;
            moistureFill.style.width = `${newMoisture}%`;
            
            // Changer la couleur selon le niveau d'humidité
            if (newMoisture < 40) {
                moistureFill.style.backgroundColor = '#f44336'; // Rouge (trop sec)
                moistureValue.style.color = '#f44336';
            } else if (newMoisture > 80) {
                moistureFill.style.backgroundColor = '#2196f3'; // Bleu (trop humide)
                moistureValue.style.color = '#2196f3';
            } else {
                moistureFill.style.backgroundColor = '#4caf50'; // Vert (optimal)
                moistureValue.style.color = '#4caf50';
            }
            
            // Mettre à jour le dashboard
            updateDashboard('moisture', newMoisture);
            
            // Animation de bouton
            this.innerHTML = '<i class="fas fa-check"></i> Lecture simulée';
            this.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Simuler une lecture';
                this.style.backgroundColor = '';
            }, 1500);
        });
    }
}

// Fonctionnalité 2 : Niveau d'eau
function initWaterLevelFeature() {
    const waterLevel = document.getElementById('waterLevel');
    const waterLevelValue = document.getElementById('waterLevelValue');
    const simulateBtn = document.getElementById('simulateWater');
    
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            // Générer une valeur aléatoire entre 20% et 100%
            const newLevel = Math.floor(Math.random() * 80) + 20;
            
            // Mettre à jour l'affichage avec animation
            waterLevel.style.height = `${newLevel}%`;
            waterLevelValue.textContent = `${newLevel}%`;
            
            // Changer la couleur selon le niveau
            if (newLevel < 30) {
                waterLevel.style.backgroundColor = '#f44336'; // Rouge (critique)
                waterLevelValue.style.color = '#f44336';
            } else if (newLevel < 50) {
                waterLevel.style.backgroundColor = '#ff9800'; // Orange (faible)
                waterLevelValue.style.color = '#ff9800';
            } else {
                waterLevel.style.backgroundColor = '#2196f3'; // Bleu (normal)
                waterLevelValue.style.color = '#2196f3';
            }
            
            // Mettre à jour le dashboard
            updateDashboard('water', newLevel);
            
            // Animation de bouton
            this.innerHTML = '<i class="fas fa-check"></i> Niveau modifié';
            this.style.backgroundColor = '#2196f3';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-random"></i> Changer le niveau';
                this.style.backgroundColor = '';
            }, 1500);
        });
    }
}

// Fonctionnalité 3 : Arrosage automatique
function initIrrigationFeature() {
    const irrigationToggle = document.getElementById('irrigationToggle');
    const irrigationStatus = document.getElementById('irrigationStatus');
    const irrigationIndicator = document.getElementById('irrigationIndicator');
    
    if (irrigationToggle) {
        irrigationToggle.addEventListener('change', function() {
            if (this.checked) {
                irrigationStatus.textContent = 'Activé';
                irrigationStatus.style.color = '#4caf50';
                irrigationIndicator.innerHTML = '<i class="fas fa-check-circle"></i> Système d\'arrosage activé';
                irrigationIndicator.style.backgroundColor = '#e8f5e9';
                irrigationIndicator.style.color = '#4caf50';
                
                // Mettre à jour le dashboard
                updateDashboard('irrigation', 'on');
            } else {
                irrigationStatus.textContent = 'Désactivé';
                irrigationStatus.style.color = '#f44336';
                irrigationIndicator.innerHTML = '<i class="fas fa-times-circle"></i> Système arrêté';
                irrigationIndicator.style.backgroundColor = '#ffebee';
                irrigationIndicator.style.color = '#d32f2f';
                
                // Mettre à jour le dashboard
                updateDashboard('irrigation', 'off');
            }
        });
    }
}

// Fonctionnalité 4 : Contrôle d'éclairage
function initLightControlFeature() {
    const lightOnBtn = document.getElementById('lightOn');
    const lightOffBtn = document.getElementById('lightOff');
    const lightStatus = document.getElementById('lightStatus');
    const lightBulb = document.getElementById('lightBulb');
    
    if (lightOnBtn && lightOffBtn) {
        lightOnBtn.addEventListener('click', function() {
            lightStatus.textContent = 'Allumé';
            lightStatus.style.color = '#ff9800';
            lightBulb.classList.remove('off');
            lightBulb.innerHTML = '<i class="fas fa-lightbulb"></i>';
            lightBulb.style.color = '#ffd700';
            lightBulb.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
            
            // Mettre à jour le dashboard
            updateDashboard('light', 'on');
            
            // Animation de bouton
            this.style.backgroundColor = '#c8e6c9';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
        
        lightOffBtn.addEventListener('click', function() {
            lightStatus.textContent = 'Éteint';
            lightStatus.style.color = '#757575';
            lightBulb.classList.add('off');
            lightBulb.innerHTML = '<i class="far fa-lightbulb"></i>';
            lightBulb.style.color = '#bdbdbd';
            lightBulb.style.textShadow = 'none';
            
            // Mettre à jour le dashboard
            updateDashboard('light', 'off');
            
            // Animation de bouton
            this.style.backgroundColor = '#ffcdd2';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    }
}

// Fonctionnalité 5 : Dashboard mobile
function initDashboard() {
    const dashIrrigation = document.getElementById('dashIrrigation');
    const dashLight = document.getElementById('dashLight');
    const lastUpdate = document.getElementById('lastUpdate');
    
    // Simuler la température pour le dashboard
    const dashTemp = document.getElementById('dashTemp');
    if (dashTemp) {
        // Température initiale
        let temperature = 24;
        
        // Mettre à jour la température toutes les 30 secondes
        setInterval(() => {
            // Variation aléatoire entre -1 et +1 degré
            temperature += (Math.random() * 2 - 1);
            temperature = Math.round(temperature * 10) / 10;
            
            // Garder dans une plage raisonnable
            if (temperature < 18) temperature = 18;
            if (temperature > 30) temperature = 30;
            
            dashTemp.textContent = `${temperature}°C`;
            
            // Mettre à jour l'heure de dernière mise à jour
            const now = new Date();
            lastUpdate.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        }, 30000);
    }
    
    // Contrôles du dashboard
    if (dashIrrigation) {
        dashIrrigation.addEventListener('click', function() {
            const irrigationToggle = document.getElementById('irrigationToggle');
            irrigationToggle.checked = !irrigationToggle.checked;
            irrigationToggle.dispatchEvent(new Event('change'));
            
            // Animation de bouton
            this.style.backgroundColor = '#455a64';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    }
    
    if (dashLight) {
        dashLight.addEventListener('click', function() {
            const lightToggle = Math.random() > 0.5;
            
            if (lightToggle) {
                document.getElementById('lightOn').click();
            } else {
                document.getElementById('lightOff').click();
            }
            
            // Animation de bouton
            this.style.backgroundColor = '#455a64';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    }
}

// Mettre à jour le dashboard
function updateDashboard(type, value) {
    const dashMoisture = document.getElementById('dashMoisture');
    const dashWater = document.getElementById('dashWater');
    const lastUpdate = document.getElementById('lastUpdate');
    
    const now = new Date();
    lastUpdate.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    switch(type) {
        case 'moisture':
            if (dashMoisture) dashMoisture.textContent = `${value}%`;
            break;
        case 'water':
            if (dashWater) dashWater.textContent = `${value}%`;
            break;
        case 'temperature':
            // Géré dans initDashboard()
            break;
        default:
            break;
    }
}

// Carrousel pour la section encadreur
function initCarousel() {
    const carouselSlide = document.getElementById('carouselSlide');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDots = document.getElementById('carouselDots');
    
    if (!carouselSlide) return;
    
    // Compter les slides existants dans le HTML
    const slides = carouselSlide.querySelectorAll('.carousel-item');
    let currentSlide = 0;
    
    // S'il n'y a pas de slides, on en crée par défaut
    if (slides.length === 0) {
        // Données des slides par défaut (si aucune image n'est ajoutée)
        const slidesData = [
            { text: 'Ing. Fosting Blaise - Photo professionnelle' },
            { text: 'Ing. Fosting Blaise - En formation' },
            { text: 'Ing. Fosting Blaise - Sur le terrain' },
            { text: 'Ing. Fosting Blaise - En réunion' }
        ];
        
        // Créer les slides par défaut
        slidesData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-item';
            slideElement.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-user-tie" style="font-size: 5rem; color: var(--primary-light); margin-bottom: 20px;"></i>
                    <p>${slide.text}</p>
                    <p style="font-size: 0.9rem; color: var(--text-light);">(Ajoutez vos photos dans le dossier "photos")</p>
                </div>
            `;
            carouselSlide.appendChild(slideElement);
        });
    }
    
    // Recréer la liste des slides après ajout éventuel
    const allSlides = carouselSlide.querySelectorAll('.carousel-item');
    
    // Créer les points de navigation
    allSlides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        carouselDots.appendChild(dot);
        
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
    });
    
    // Gérer les boutons précédent/suivant
    if (carouselPrev && carouselNext) {
        carouselPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + allSlides.length) % allSlides.length;
            goToSlide(currentSlide);
        });
        
        carouselNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % allSlides.length;
            goToSlide(currentSlide);
        });
    }
    
    // Fonction pour aller à un slide spécifique
    function goToSlide(index) {
        currentSlide = index;
        carouselSlide.style.transform = `translateX(-${index * 100}%)`;
        
        // Mettre à jour les points actifs
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Défilement automatique (toutes les 5 secondes)
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % allSlides.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Arrêter le défilement automatique au survol
    carouselSlide.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carouselSlide.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % allSlides.length;
            goToSlide(currentSlide);
        }, 5000);
    });
}

// Formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation simple
            if (!name || !email || !message) {
                showFormMessage('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simuler l'envoi du formulaire (sans backend)
            showFormMessage('Merci pour votre message! Nous vous répondrons bientôt.', 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Masquer le message après 5 secondes
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
}

// Afficher un message dans le formulaire
function showFormMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}

// Validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animations au défilement
function initScrollAnimations() {
    // Observer les éléments pour les animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les cartes de fonctionnalités, les membres d'équipe et les cartes de remerciements
    document.querySelectorAll('.feature-card, .team-member, .acknowledgment-card').forEach(el => {
        observer.observe(el);
    });
    
    // Ajouter une classe CSS pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .team-member, .acknowledgment-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in, .team-member.animate-in, .acknowledgment-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Simulation initiale des données
window.onload = function() {
    // Simuler un changement d'humidité initial
    setTimeout(() => {
        const moistureBtn = document.getElementById('simulateMoisture');
        if (moistureBtn) moistureBtn.click();
    }, 1000);
    
    // Simuler un changement de niveau d'eau initial
    setTimeout(() => {
        const waterBtn = document.getElementById('simulateWater');
        if (waterBtn) waterBtn.click();
    }, 2000);
};