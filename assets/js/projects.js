/**
 * Projects Module
 * Handles project grid interactions and filtering
 */

(function() {
    'use strict';
    
    /**
     * Project data structure (can be expanded for filtering/sorting)
     */
    const projects = [
        {
            id: 1,
            title: 'Editorial Design',
            category: 'Print / Layout',
            year: 2024,
            tags: ['print', 'editorial', 'typography']
        },
        {
            id: 2,
            title: 'Brand Identity',
            category: 'Branding / Visual System',
            year: 2024,
            tags: ['branding', 'identity', 'logo']
        },
        {
            id: 3,
            title: 'Packaging Design',
            category: 'Product / 3D',
            year: 2024,
            tags: ['packaging', 'product', '3d']
        },
        {
            id: 4,
            title: 'Typography Poster',
            category: 'Print / Typography',
            year: 2023,
            tags: ['print', 'typography', 'poster']
        },
        {
            id: 5,
            title: 'Digital Campaign',
            category: 'Digital / Social Media',
            year: 2023,
            tags: ['digital', 'social', 'campaign']
        },
        {
            id: 6,
            title: 'Book Cover Design',
            category: 'Print / Editorial',
            year: 2023,
            tags: ['print', 'editorial', 'book']
        },
        {
            id: 7,
            title: 'Exhibition Design',
            category: 'Spatial / Environmental',
            year: 2023,
            tags: ['spatial', 'exhibition', '3d']
        },
        {
            id: 8,
            title: 'Motion Graphics',
            category: 'Animation / Digital',
            year: 2023,
            tags: ['animation', 'motion', 'digital']
        }
    ];
    
    /**
     * Enhanced hover effect with magnetic pull
     */
    function initMagneticEffect() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const cta = card.querySelector('.project-card__cta');
            
            if (!cta) return;
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 10;
                const deltaY = (y - centerY) / 10;
                
                cta.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                cta.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    /**
     * Add ripple effect on project card click
     */
    function initRippleEffect() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Only add ripple if not clicking on a link
                if (e.target.tagName === 'A') return;
                
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(220, 38, 38, 0.2)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple-animation 0.6s ease-out';
                ripple.style.pointerEvents = 'none';
                
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation to stylesheet dynamically
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Project card preloading on hover
     */
    function initProjectPreload() {
        const projectLinks = document.querySelectorAll('.project-card__link');
        
        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Preload the project page
                const href = link.getAttribute('href');
                if (href && !link.dataset.preloaded) {
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'prefetch';
                    preloadLink.href = href;
                    document.head.appendChild(preloadLink);
                    link.dataset.preloaded = 'true';
                }
            });
        });
    }
    
    /**
     * Add sequential animation on scroll
     */
    function initSequentialReveal() {
        const projectCards = document.querySelectorAll('.project-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(projectCards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectCards.forEach(card => observer.observe(card));
    }
    
    /**
     * Keyboard navigation support
     */
    function initKeyboardNav() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            const link = card.querySelector('.project-card__link');
            
            if (!link) return;
            
            link.addEventListener('keydown', (e) => {
                let nextCard;
                
                switch(e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        nextCard = projectCards[index + 1];
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        nextCard = projectCards[index - 1];
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        // Move to card below (assuming 2-column grid on desktop)
                        nextCard = projectCards[index + 2];
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        // Move to card above
                        nextCard = projectCards[index - 2];
                        break;
                }
                
                if (nextCard) {
                    const nextLink = nextCard.querySelector('.project-card__link');
                    if (nextLink) nextLink.focus();
                }
            });
        });
    }
    
    /**
     * Initialize projects module
     */
    function init() {
        initMagneticEffect();
        initRippleEffect();
        initProjectPreload();
        initSequentialReveal();
        initKeyboardNav();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();