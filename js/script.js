    
        // Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

        // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

        // Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

        // Back to top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

        // Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

        // Image loading and error handling
function handleImageLoad() {
    document.querySelectorAll('.game-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('loading');
        });
        
        img.addEventListener('error', function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('error');
            this.classList.add('error');
        });
    });
}

        // Remove loading class after a delay
setTimeout(() => {
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
    handleImageLoad();
}, 2000);

        // Enhanced interactive effects
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

        // Dynamic title update
let originalTitle = document.title;
let titleInterval;

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '🎮 Geri gel! - BirolStudio';
        titleInterval = setInterval(() => {
            document.title = document.title.startsWith('🎮') ? '🎯 Oyunları kaçırma!' : '🎮 Geri gel! - BirolStudio';
        }, 2000);
    } else {
        document.title = originalTitle;
        clearInterval(titleInterval);
    }
});

        // Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

        // Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

        // Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-container')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

        // Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

        // Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

        // Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
}, 100));

        // Add loading state for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        setTimeout(() => {
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
        }, 1000);
    });
});

        // Analytics-ready event tracking (placeholder)
function trackEvent(category, action, label) {
            // gtag('event', action, {
            //     event_category: category,
            //     event_label: label,
            //     value: 1
            // });
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

        // Track game link clicks
document.querySelectorAll('.game-link').forEach(link => {
    link.addEventListener('click', function() {
        const gameName = this.closest('.game-card').querySelector('.game-title').textContent;
        trackEvent('Games', 'Click', gameName);
    });
});

        // Track contact link clicks
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function() {
        const linkType = this.textContent.includes('itch.io') ? 'itch.io' : 'email';
        trackEvent('Contact', 'Click', linkType);
    });
});
