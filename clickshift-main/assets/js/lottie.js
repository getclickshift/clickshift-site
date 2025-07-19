// =============================================================================
// OPTIMIZED LOTTIE ANIMATIONS - Performance First
// =============================================================================

class LottieAnimationController {
    constructor() {
        this.animations = new Map();
        this.throttleDelay = 100; // Throttle animations
        this.lastUpdate = 0;
        
        this.init();
    }

    init() {
        // Only essential animations for performance
        this.enhanceEssentialIcons();
        this.addLightweightHoverEffects();
        
        console.log('🎭 Optimized animations initialized');
    }

    enhanceEssentialIcons() {
        // Only enhance feature icons with simple CSS animations
        const featureIcons = document.querySelectorAll('.feature-icon .material-symbols-outlined');
        featureIcons.forEach((icon, index) => {
            this.addSimpleHoverEffect(icon, index);
        });

        // Simple theme toggle animation
        const themeToggle = document.querySelector('.theme-toggle .material-symbols-outlined');
        if (themeToggle) {
            this.addThemeToggleEffect(themeToggle);
        }
    }

    addSimpleHoverEffect(icon, index) {
        const iconName = icon.textContent.trim();
        icon.classList.add('animated');
        
        // Simple CSS-only hover effects
        icon.addEventListener('mouseenter', () => {
            if (this.shouldThrottle()) return;
            
            switch(iconName) {
                case 'label_important':
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    break;
                case 'search':
                    icon.style.transform = 'scale(1.1)';
                    icon.style.filter = 'brightness(1.2)';
                    break;
                case 'shortcut':
                    icon.style.transform = 'scale(1.1)';
                    icon.style.textShadow = '0 0 10px var(--md-primary)';
                    break;
                case 'integration_instructions':
                    icon.style.transform = 'scale(1.1) rotate(180deg)';
                    break;
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.filter = '';
            icon.style.textShadow = '';
        });
    }

    addThemeToggleEffect(icon) {
        icon.addEventListener('click', () => {
            if (this.shouldThrottle()) return;
            
            icon.style.animation = 'themeToggleFlip 0.4s ease-in-out';
            setTimeout(() => {
                icon.style.animation = '';
            }, 400);
        });
    }

    addLightweightHoverEffects() {
        // Simple button effects without heavy animations
        const buttons = document.querySelectorAll('.cta-button, .cta-button-white, .submit-button');
        buttons.forEach(button => {
            this.addSimpleButtonEffect(button);
        });
    }

    addSimpleButtonEffect(button) {
        button.addEventListener('mouseenter', () => {
            if (this.shouldThrottle()) return;
            button.style.filter = 'brightness(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.filter = '';
        });
        
        button.addEventListener('click', () => {
            if (this.shouldThrottle()) return;
            
            // Simple scale effect
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    }

    shouldThrottle() {
        const now = performance.now();
        if (now - this.lastUpdate < this.throttleDelay) {
            return true;
        }
        this.lastUpdate = now;
        return false;
    }

    // Simplified keyframes - only essential ones
    addEssentialKeyframes() {
        const keyframes = `
            @keyframes themeToggleFlip {
                0% { transform: scale(1) rotateY(0deg); }
                50% { transform: scale(1.1) rotateY(180deg); }
                100% { transform: scale(1) rotateY(360deg); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
    }
}

// Initialize with performance checks
document.addEventListener('DOMContentLoaded', function() {
    // Only enable animations on capable devices
    const isHighPerformanceDevice = navigator.hardwareConcurrency > 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isHighPerformanceDevice && !prefersReducedMotion) {
        const lottieController = new LottieAnimationController();
        lottieController.addEssentialKeyframes();
        window.lottieController = lottieController;
    } else {
        console.log('🎭 Advanced animations disabled for performance');
    }
});