// Parthenius AI Studio - Modern interactions

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Navigation Scroll Effect
    // ========================================
    const navContainer = document.getElementById('nav-container');

    function updateNavbarState() {
        if (window.scrollY > 50) {
            navContainer.classList.remove('nav-transparent');
            navContainer.classList.add('nav-scrolled');
        } else {
            navContainer.classList.remove('nav-scrolled');
            navContainer.classList.add('nav-transparent');
        }
    }

    // Initial check
    updateNavbarState();

    // Listen for scroll with passive flag for performance
    window.addEventListener('scroll', updateNavbarState, { passive: true });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Update active state for job nav items
                document.querySelectorAll('.jobs-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                if (this.classList.contains('jobs-nav-item')) {
                    this.classList.add('active');
                }

                // Smooth scroll with offset for fixed header
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Intersection Observer for Job Sections
    // ========================================
    const sections = document.querySelectorAll('.jobs-section');
    const navItems = document.querySelectorAll('.jobs-nav-item');

    if (sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${id}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ========================================
    // Animate Elements on Scroll (Intersection Observer)
    // ========================================
    const animateOnScroll = () => {
        // Only animate audience items - feature-card and process-card 
        // should not animate on scroll to avoid blinking
        const elementsToAnimate = document.querySelectorAll('.audience-item');

        if (elementsToAnimate.length === 0) return;

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay based on element position
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate-fade-in-up');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        });

        elementsToAnimate.forEach(el => {
            animationObserver.observe(el);
        });
    };

    animateOnScroll();

    // ========================================
    // Ensure feature and process cards are always visible
    // ========================================
    const ensureCardsVisible = () => {
        const featureCards = document.querySelectorAll('.feature-card');
        const processCards = document.querySelectorAll('.process-card');

        [...featureCards, ...processCards].forEach(card => {
            // Remove any animation classes
            card.classList.remove('animate-fade-in-up');
            // Ensure visibility
            card.style.opacity = '1';
            card.style.transform = 'none';
            card.style.animation = 'none';
        });
    };

    // Run immediately and after a short delay to catch any late-applied classes
    ensureCardsVisible();
    setTimeout(ensureCardsVisible, 100);

    // ========================================
    // Button Hover Effects (Enhanced)
    // ========================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(4px)';
            }
        });

        btn.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });

    // ========================================
    // Platform Tags Hover Animation
    // ========================================
    const platformTags = document.querySelectorAll('.platform-tag');

    platformTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});
