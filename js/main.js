document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.querySelector('#header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    
    // Smart Header - Hide on scroll down, show on scroll up
    let lastScrollTop = 0;
    const headerHeight = 80;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Background effect
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/Show logic
        if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
            header.style.transform = `translateY(-${headerHeight}px)`;
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Mobile Menu Toggle with Accessibility
    const toggleMenu = () => {
        const isOpen = mobileMenuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // WCAG: Update aria-expanded
        mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMenu);
        // Ensure initial aria state
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));
});
