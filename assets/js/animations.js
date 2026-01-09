/**
 * Animations Module
 * Handles scroll-triggered animations, parallax effects, and micro-interactions
 */

(function() {
    'use strict';
    
    /**
     * Intersection Observer for scroll animations
     */
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.project-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        elements.forEach(el => observer.observe(el));
    }
    
    /**
     * Parallax effect for hero section
     */
    function initParallax() {
        const heroAccent = document.querySelector('.hero__accent');
        const aboutAccent = document.querySelector('.about__accent');
        
        if (!heroAccent && !aboutAccent) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            // Hero accent parallax
            if (heroAccent) {
                const heroOffset = heroAccent.getBoundingClientRect().top + scrolled;
                const heroProgress = (scrolled - heroOffset + viewportHeight) / (viewportHeight * 2);
                
                if (heroProgress > 0 && heroProgress < 1) {
                    const translateY = heroProgress * 80;
                    heroAccent.style.transform = `translateY(${translateY}px)`;
                }
            }
            
            // About accent parallax
            if (aboutAccent) {
                const aboutOffset = aboutAccent.getBoundingClientRect().top + scrolled;
                const aboutProgress = (scrolled - aboutOffset + viewportHeight) / (viewportHeight * 2);
                
                if (aboutProgress > 0 && aboutProgress < 1) {
                    const translateY = aboutProgress * -50;
                    aboutAccent.style.transform = `translateY(${translateY}px)`;
                }
            }
            
            ticking = false;
        }
        
        function requestParallaxUpdate() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }
    
    /**
     * Image hover effects with mouse tracking
     */
    function initImageHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const image = card.querySelector('.project-card__image');
            const overlay = card.querySelector('.project-card__overlay');
            
            if (!image || !overlay) return;
            
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.zIndex = '';
                image.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                image.style.transform = `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    }
    
    /**
     * Stagger animation for project cards
     */
    function initStaggerAnimation() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            // Add increasing delay based on index
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    /**
     * Micro-interactions for buttons and links
     */
    function initMicroInteractions() {
        const interactiveElements = document.querySelectorAll('.contact__link, .footer__link, .nav__link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
    
    /**
     * Lazy load images for performance
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    /**
     * Reduced motion support
     */
    function checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--transition-fast', '0.01ms');
            document.documentElement.style.setProperty('--transition-base', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
            document.documentElement.style.setProperty('--transition-smooth', '0.01ms');
        }
    }
    
    /**
     * Initialize all animations
     */
    function init() {
        checkReducedMotion();
        initScrollAnimations();
        initParallax();
        initImageHoverEffects();
        initStaggerAnimation();
        initMicroInteractions();
        initLazyLoading();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();