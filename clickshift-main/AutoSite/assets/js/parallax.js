// =============================================================================
// OPTIMIZED PARALLAX SCROLLING EFFECTS - Performance First
// =============================================================================

class ParallaxController {
    constructor() {
        this.shapes = [];
        this.isInitialized = false;
        this.rafId = null;
        this.lastScrollY = 0;
        this.ticking = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.throttleDelay = 16; // 60fps max
        this.lastUpdate = 0;
        
        this.init();
    }

    init() {
        // Reduced number of shapes for performance
        this.createOptimizedShapes();
        this.bindOptimizedScrollListener();
        
        console.log('✨ Optimized parallax effects initialized');
        this.isInitialized = true;
    }

    createOptimizedShapes() {
        const shapesContainer = this.createShapesContainer();
        
        // Reduced to only 4 strategic shapes for performance
        const shapeConfigs = [
            { type: 'circle', size: 100, speed: 0.2, opacity: 0.08, color: 'var(--md-primary)', top: '20%', left: '85%' },
            { type: 'triangle', size: 80, speed: 0.3, opacity: 0.06, color: 'var(--md-secondary)', top: '60%', left: '10%' },
            { type: 'circle', size: 90, speed: 0.25, opacity: 0.07, color: 'var(--md-tertiary)', top: '120%', left: '88%' },
            { type: 'square', size: 85, speed: 0.35, opacity: 0.05, color: 'var(--md-primary)', top: '180%', left: '15%' }
        ];

        shapeConfigs.forEach((config, index) => {
            const shape = this.createOptimizedShape(config, index);
            shapesContainer.appendChild(shape);
            this.shapes.push({
                element: shape,
                ...config,
                initialTop: parseFloat(config.top),
                initialLeft: parseFloat(config.left)
            });
        });
    }

    createShapesContainer() {
        let container = document.getElementById('parallax-shapes');
        
        if (!container) {
            container = document.createElement('div');
            container.id = 'parallax-shapes';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
                will-change: transform;
            `;
            document.body.appendChild(container);
        }
        
        return container;
    }

    createOptimizedShape(config, index) {
        const shape = document.createElement('div');
        shape.className = `parallax-shape parallax-${config.type}`;
        shape.style.cssText = `
            position: absolute;
            width: ${config.size}px;
            height: ${config.size}px;
            top: ${config.top};
            left: ${config.left};
            opacity: ${config.opacity};
            will-change: transform;
            transform: translate3d(0, 0, 0);
        `;
        
        // Simplified shapes for better performance
        this.applyOptimizedShapeStyles(shape, config);
        
        return shape;
    }

    applyOptimizedShapeStyles(element, config) {
        // Simplified shapes without complex gradients
        switch (config.type) {
            case 'circle':
                Object.assign(element.style, {
                    background: config.color,
                    borderRadius: '50%',
                    filter: 'blur(2px)'
                });
                break;
                
            case 'triangle':
                Object.assign(element.style, {
                    width: '0',
                    height: '0',
                    backgroundColor: 'transparent',
                    borderLeft: `${config.size/2}px solid transparent`,
                    borderRight: `${config.size/2}px solid transparent`,
                    borderBottom: `${config.size}px solid ${config.color}`,
                    filter: 'blur(1px)'
                });
                break;
                
            case 'square':
                Object.assign(element.style, {
                    background: config.color,
                    borderRadius: '10%',
                    transform: 'rotate(45deg)',
                    filter: 'blur(1px)'
                });
                break;
        }
    }

    bindOptimizedScrollListener() {
        // Throttled scroll listener for better performance
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.lastScrollY = window.pageYOffset;
                this.requestTick();
            }, 10); // Throttle to every 10ms
        }, { passive: true });
    }

    requestTick() {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => this.updateParallax());
        }
    }

    updateParallax() {
        const now = performance.now();
        
        // Skip update if not enough time has passed (60fps limit)
        if (now - this.lastUpdate < this.throttleDelay) {
            this.ticking = false;
            return;
        }
        
        const scrollY = this.lastScrollY;
        
        this.shapes.forEach(shape => {
            const speed = shape.speed;
            const offset = scrollY * speed * 0.5; // Reduced multiplier
            
            // Use transform3d for better performance
            shape.element.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
        
        this.lastUpdate = now;
        this.ticking = false;
    }

    // Remove mouse parallax - too performance intensive
    // Remove floating animations - too performance intensive
    
    // Simplified hero parallax
    initHeroParallax() {
        const heroElements = [
            { selector: '.dashboard-mockup', speed: 0.05 }
        ];

        let heroTimeout;
        
        const updateHeroParallax = () => {
            clearTimeout(heroTimeout);
            heroTimeout = setTimeout(() => {
                const scrollY = window.pageYOffset;
                
                heroElements.forEach(({ selector, speed }) => {
                    const element = document.querySelector(selector);
                    if (element && scrollY < window.innerHeight) {
                        const offset = scrollY * speed;
                        element.style.transform = `translate3d(0, ${offset}px, 0)`;
                    }
                });
            }, 10);
        };

        window.addEventListener('scroll', updateHeroParallax, { passive: true });
    }

    // Performance cleanup
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        const container = document.getElementById('parallax-shapes');
        if (container) {
            container.remove();
        }
        
        this.shapes = [];
        this.isInitialized = false;
    }
}

// Initialize with performance checks
document.addEventListener('DOMContentLoaded', function() {
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Performance check - only enable on capable devices
    const isHighPerformanceDevice = navigator.hardwareConcurrency > 4 && 
                                   window.devicePixelRatio <= 2;
    
    if (!prefersReducedMotion && isHighPerformanceDevice) {
        window.parallaxController = new ParallaxController();
        window.parallaxController.initHeroParallax();
    } else {
        console.log('⚡ Parallax effects disabled for performance/accessibility');
    }
});