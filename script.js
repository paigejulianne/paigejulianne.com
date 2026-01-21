// Paige Julianne Sullivan - Consulting Website
// Interactive functionality

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    const getSavedTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return prefersDark.matches ? 'dark' : 'light';
    };

    // Apply theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize theme
    applyTheme(getSavedTheme());

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    const updateNavbarBg = () => {
        const currentScroll = window.pageYOffset;
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        
        if (isDark) {
            navbar.style.background = currentScroll > 50 
                ? 'rgba(10, 10, 11, 0.95)' 
                : 'rgba(10, 10, 11, 0.8)';
        } else {
            navbar.style.background = currentScroll > 50 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(255, 255, 255, 0.9)';
        }
        
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', updateNavbarBg);
    
    // Update navbar when theme changes
    const themeObserver = new MutationObserver(updateNavbarBg);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .timeline-item, .stat, .credential-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for grid items
    document.querySelectorAll('.skills-grid, .about-stats, .contact-grid, .credentials-grid').forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Timeline items stagger
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Typing effect for code block (subtle)
    const codeBlock = document.querySelector('.code-block code');
    if (codeBlock) {
        const originalHTML = codeBlock.innerHTML;
        codeBlock.style.opacity = '0';
        
        setTimeout(() => {
            codeBlock.style.transition = 'opacity 0.5s ease';
            codeBlock.style.opacity = '1';
        }, 800);
    }
});
