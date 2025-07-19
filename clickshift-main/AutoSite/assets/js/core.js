// =============================================================================
// CORE FUNCTIONALITY - Theme Toggle & Scroll Observers
// =============================================================================

// Dark Mode Toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = 'dark_mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = 'light_mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = 'light_mode';
    } else {
        themeIcon.textContent = 'dark_mode';
    }
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to observe for animation
    const elementsToAnimate = [
        '#customers-grid',
        '#features-title',
        '#features-subtitle',
        '#features-grid .feature-card',
        '#contact-title',
        '#contact-subtitle',
        '#contact-form'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));
    });
}

// FAB smooth scrolling
function initializeFAB() {
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance optimized scroll listener
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const nav = document.querySelector('.nav');
        
        // Add subtle nav shadow when scrolled
        if (scrolled > 50) {
            nav.style.boxShadow = 'var(--md-elevation-2)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Initialize all core functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeScrollAnimations();
    initializeFAB();
    initializeSmoothScrolling();
    initializeScrollEffects();
    
    console.log('🚀 WorkflowBoost Core initialized');
});