/**
 * Navigation Module
 * Handles mobile menu toggle, smooth scrolling, and sticky nav behavior
 */

(function() {
    'use strict';
    
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    /**
     * Toggle mobile navigation menu
     */
    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        navToggle.setAttribute('aria-expanded', isOpen);
        
        // Prevent body scroll when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Close mobile menu
     */
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    /**
     * Handle scroll behavior - hide/show nav
     */
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Show nav when scrolling up, hide when scrolling down
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add('nav--hidden');
        } else {
            nav.classList.remove('nav--hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    /**
     * Request animation frame for smooth scrolling
     */
    function requestScrollUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    /**
     * Smooth scroll to section
     */
    function smoothScroll(target) {
        const element = document.querySelector(target);
        
        if (element) {
            const navHeight = nav.offsetHeight;
            const targetPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Set active nav link based on scroll position
     */
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPosition = window.scrollY + nav.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    /**
     * Initialize navigation
     */
    function init() {
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', toggleMenu);
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Smooth scroll on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle internal links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    smoothScroll(href);
                    closeMenu();
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
        
        // Scroll behavior
        window.addEventListener('scroll', () => {
            requestScrollUpdate();
            setActiveLink();
        }, { passive: true });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Close mobile menu on desktop
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
        
        // Set initial active link
        setActiveLink();
        
        // Handle initial hash in URL
        if (window.location.hash) {
            setTimeout(() => {
                smoothScroll(window.location.hash);
            }, 100);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();