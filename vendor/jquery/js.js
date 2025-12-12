
// ===== SLIDER D'IMAGES =====
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    currentIndex = index;
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-slide toutes les 4 secondes
setInterval(nextSlide, 4000);

// ===== MENU HAMBURGER =====
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    
    // Ferme tous les sous-menus
    document.querySelectorAll('.has-sub').forEach(item => {
        item.classList.remove('active');
    });
}

// ===== SOUS-MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const hasSubItems = document.querySelectorAll('.has-sub');
    
    hasSubItems.forEach(item => {
        const parentLink = item.querySelector('a');
        
        // Clic sur le parent (Nos offres)
        parentLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                e.stopPropagation();
                
                // Ferme les autres sous-menus
                hasSubItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle le sous-menu actuel
                item.classList.toggle('active');
            }
        });
        
        // Permet le clic sur les liens du sous-menu
        const subMenuLinks = item.querySelectorAll('.sub-menu a');
        subMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Ferme le menu après clic
                closeMenu();
            });
        });
    });
});

// ===== NAVIGATION ACTIVE AU SCROLL =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Retire la classe active de tous les liens
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Ajoute la classe active au lien correspondant
            const activeLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===== SMOOTH SCROLL VERS LES SECTIONS =====
document.querySelectorAll('.scroll-to-section a, .main-menu a, .responsive-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Vérifie si c'est un lien interne (#)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Ferme le menu mobile après clic
                closeMenu();
            }
        }
    });
});

// ===== SCROLL AUTOMATIQUE AU CHARGEMENT (pour liens externes) =====
window.addEventListener('load', function() {
    if (window.location.hash) {
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const targetPosition = target.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// ===== FLIP CARD (si tu as des cartes à retourner) =====
function flipCard(card) {
    card.classList.toggle('flipped');
}

// ===== INTERSECTION OBSERVER POUR ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Une fois animé, on arrête d'observer
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments (vérifie qu'ils existent)
const imageWrapper = document.getElementById('aboutImageWrapper');
const aboutContent = document.getElementById('aboutContent');

if (imageWrapper) observer.observe(imageWrapper);
if (aboutContent) observer.observe(aboutContent);

// ===== JQUERY (SI TU UTILISES JQUERY) =====
// Note: Le code jQuery ci-dessous est redondant avec le JavaScript vanilla ci-dessus
// Tu peux le supprimer si tu n'utilises pas jQuery ailleurs

// Active le premier élément du menu
if (typeof $ !== 'undefined') {
    $(document).ready(function() {
        $('.nav li:first').addClass('active');
        
        // Gestion du scroll avec jQuery
        var checkSection = function() {
            $('.section').each(function() {
                var $this = $(this),
                    topEdge = $this.offset().top - 80,
                    bottomEdge = topEdge + $this.height(),
                    wScroll = $(window).scrollTop();
                    
                if (topEdge < wScroll && bottomEdge > wScroll) {
                    var currentId = $this.data('section'),
                        reqLink = $('a').filter('[href*=\\#' + currentId + ']');
                    reqLink.closest('li').addClass('active')
                           .siblings().removeClass('active');
                }
            });
        };
        
        $(window).scroll(function() {
            checkSection();
        });
    });
}