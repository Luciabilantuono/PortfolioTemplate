/**
 * Main Application Module
 * Handles global functionality and initialization
 */

(function() {
    'use strict';
    
    /**
     * Back to top button functionality
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
        let ticking = false;
        
        function updateBackToTop() {
            const scrolled = window.scrollY;
            
            if (scrolled > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
            
            ticking = false;
        }
        
        function requestBackToTopUpdate() {
            if (!ticking) {
                window.requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestBackToTopUpdate, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /**
     * Performance monitoring
     */
    function initPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            
            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Browser doesn't support LCP
            }
            
            // Monitor First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            
            try {
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // Browser doesn't support FID
            }
        }
        
        // Log page load time
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', pageLoadTime + 'ms');
        });
    }
    
    /**
     * External link handling
     */
    function initExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(link => {
            // Add rel attributes for security
            if (!link.getAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Add visual indicator for external links
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.textContent = ' ↗';
                icon.style.fontSize = '0.8em';
                icon.style.opacity = '0.6';
                link.appendChild(icon);
            }
        });
    }
    
    /**
     * Form handling (if contact form is added)
     */
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic form validation
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                console.log('Form submitted:', data);
                
                // You can add form submission logic here
                // For example, using Formspree or another service
            });
        });
    }
    
    /**
     * Cookie consent (basic implementation)
     */
    function initCookieConsent() {
        const consent = localStorage.getItem('cookie-consent');
        
        if (!consent) {
            // Create consent banner
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-banner__content">
                    <p>This site uses cookies to enhance your experience.</p>
                    <button class="cookie-banner__accept">Accept</button>
                </div>
            `;
            
            // Add styles
            banner.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: var(--color-glass);
                backdrop-filter: blur(12px);
                padding: var(--space-md);
                border-top: 1px solid var(--color-border);
                z-index: 1000;
                display: flex;
                justify-content: center;
            `;
            
            document.body.appendChild(banner);
            
            const acceptBtn = banner.querySelector('.cookie-banner__accept');
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'true');
                banner.remove();
            });
        }
    }
    
    /**
     * Error handling
     */
    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // You can add error reporting here
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // You can add error reporting here
        });
    }
    
    /**
     * Service Worker registration (for PWA support)
     */
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Uncomment to enable service worker
                /*
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registered:', reg))
                    .catch(err => console.log('Service Worker registration failed:', err));
                */
            });
        }
    }
    
    /**
     * Print styles optimization
     */
    function initPrintOptimization() {
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
        });
        
        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        });
    }
    
    /**
     * Initialize all functionality
     */
    function init() {
        console.log('Portfolio template initialized');
        
        initBackToTop();
        initExternalLinks();
        initFormHandling();
        initErrorHandling();
        initServiceWorker();
        initPrintOptimization();
        
        // Only enable performance monitoring in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            initPerformanceMonitoring();
        }
        
        // Cookie consent (optional)
        // initCookieConsent();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose utility functions globally if needed
    window.PortfolioApp = {
        version: '1.0.0',
        initialized: true
    };
    
})();