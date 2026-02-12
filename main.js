// Utah County Electrician Website - Main JavaScript
// Mobile-first, performance-optimized interactions

class ElectricianSite {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.isScrolling = false;
        this.scrollThrottle = null;
        
        // Initialize all functionality
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSite());
        } else {
            this.setupSite();
        }
    }
    
    setupSite() {
        console.log('🔌 Initializing Electrician Site...');
        
        // Core functionality
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
        this.setupFAQ();
        this.setupContactForm();
        this.setupClickToCall();
        this.setupHeaderScroll();
        
        // Performance optimizations
        this.setupIntersectionObserver();
        this.setupLazyLoading();
        
        // Event listeners
        this.setupEventListeners();
        
        console.log('✅ Site initialized successfully');
    }
    
    /**
     * Mobile Menu Toggle
     */
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (!menuToggle || !mobileNav) return;
        
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu(menuToggle, mobileNav);
        });
        
        // Close menu when clicking on nav links
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(menuToggle, mobileNav);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                this.closeMobileMenu(menuToggle, mobileNav);
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu(menuToggle, mobileNav);
            }
        });
    }
    
    toggleMobileMenu(toggle, nav) {
        const isActive = toggle.classList.toggle('active');
        nav.classList.toggle('active', isActive);
        
        // Update ARIA attributes for accessibility
        toggle.setAttribute('aria-expanded', isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
    
    closeMobileMenu(toggle, nav) {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    /**
     * Smooth Scroll Navigation
     */
    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just a hash
                if (href === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (!targetElement) return;
                
                // Account for sticky headers
                const headerHeight = this.getHeaderHeight();
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.replaceState) {
                    history.replaceState(null, null, href);
                }
            });
        });
    }
    
    getHeaderHeight() {
        const header = document.querySelector('.header');
        const emergencyBanner = document.querySelector('.emergency-banner');
        
        let height = 0;
        if (header) height += header.offsetHeight;
        if (emergencyBanner) height += emergencyBanner.offsetHeight;
        
        return height + 20; // Add some padding
    }
    
    /**
     * Intersection Observer for Scroll Animations
     */
    setupIntersectionObserver() {
        // Create observer for scroll animations
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all sections and cards
        const observeElements = document.querySelectorAll(`
            .service-card,
            .feature,
            .review-card,
            .blog-card,
            .trust-item,
            .city,
            .faq-item
        `);
        
        observeElements.forEach((el, index) => {
            // Add observe class and delay
            el.classList.add('observe');
            el.style.transitionDelay = `${index * 0.1}s`;
            
            this.scrollObserver.observe(el);
        });
    }
    
    /**
     * FAQ Accordion
     */
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0px';
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0px';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
                
                // Update ARIA attributes
                question.setAttribute('aria-expanded', !isActive);
            });
        });
    }
    
    /**
     * Contact Form Enhancement
     */
    setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent;
        
        form.addEventListener('submit', (e) => {
            // Basic form validation
            const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-warning)';
                    
                    // Reset border color after user starts typing
                    field.addEventListener('input', () => {
                        field.style.borderColor = '';
                    }, { once: true });
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                this.showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
            
            // Form will submit normally to FormSubmit.co
            this.showToast('Thank you! We\'ll contact you soon.', 'success');
        });
        
        // Phone number formatting
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length >= 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
                }
                
                e.target.value = value;
            });
        }
    }
    
    /**
     * Click-to-Call Enhancement
     */
    setupClickToCall() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        phoneLinks.forEach(link => {
            // Add visual feedback on mobile
            if (this.isMobile) {
                link.addEventListener('touchstart', () => {
                    link.style.transform = 'scale(0.98)';
                });
                
                link.addEventListener('touchend', () => {
                    setTimeout(() => {
                        link.style.transform = '';
                    }, 150);
                });
            }
            
            // Track clicks for analytics (if needed)
            link.addEventListener('click', () => {
                console.log('📞 Phone call initiated:', link.href);
                // Add analytics tracking here if needed
                // gtag('event', 'phone_call', { phone_number: link.href });
            });
        });
    }
    
    /**
     * Header Scroll Effects
     */
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let isHeaderVisible = true;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;
            const scrolledPast = currentScrollY > 100;
            
            // Add background blur when scrolled
            if (scrolledPast) {
                header.style.backdropFilter = 'blur(10px)';
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                header.style.backdropFilter = '';
                header.style.backgroundColor = '';
            }
            
            // Hide/show header on mobile when scrolling
            if (this.isMobile && Math.abs(currentScrollY - lastScrollY) > 10) {
                if (scrollingDown && scrolledPast && isHeaderVisible) {
                    header.style.transform = 'translateY(-100%)';
                    isHeaderVisible = false;
                } else if (!scrollingDown && !isHeaderVisible) {
                    header.style.transform = 'translateY(0)';
                    isHeaderVisible = true;
                }
            }
            
            lastScrollY = currentScrollY;
        };
        
        // Throttle scroll events for performance
        window.addEventListener('scroll', () => {
            if (this.scrollThrottle) return;
            
            this.scrollThrottle = setTimeout(() => {
                handleScroll();
                this.scrollThrottle = null;
            }, 16); // ~60fps
        });
    }
    
    /**
     * Scroll Animations for sections
     */
    setupScrollAnimations() {
        // Add stagger delays to grid items
        const grids = [
            '.services-grid .service-card',
            '.features-grid .feature',
            '.cities-grid .city',
            '.reviews-grid .review-card',
            '.blog-grid .blog-card'
        ];
        
        grids.forEach(selector => {
            const items = document.querySelectorAll(selector);
            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
    
    /**
     * Lazy Loading for Images (when real images are added)
     */
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    /**
     * Event Listeners
     */
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.isMobile = window.innerWidth < 768;
        }, 250));
        
        // Handle CTA button clicks
        const ctaButtons = document.querySelectorAll('.btn-primary, .mobile-cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add ripple effect
                this.createRipple(e);
                
                // Track CTA clicks
                console.log('🎯 CTA clicked:', button.textContent.trim());
            });
        });
        
        // Handle service card clicks
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceName = card.querySelector('h3')?.textContent;
                console.log('🛠️ Service selected:', serviceName);
                
                // Scroll to contact form
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-fill service dropdown if available
                    const serviceSelect = document.querySelector('#service');
                    if (serviceSelect && serviceName) {
                        const option = Array.from(serviceSelect.options)
                            .find(opt => opt.textContent.toLowerCase().includes(serviceName.toLowerCase()));
                        if (option) option.selected = true;
                    }
                }
            });
        });
        
        // Handle emergency service calls
        const emergencyButtons = document.querySelectorAll('.emergency-call, .emergency-service');
        emergencyButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('🚨 Emergency service requested');
                // Could add special analytics tracking for emergency calls
            });
        });
    }
    
    /**
     * Utility Functions
     */
    
    // Create ripple effect for buttons
    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Show toast notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'var(--color-warning)' : 'var(--color-success)'};
            color: white;
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-md);
            font-weight: var(--font-weight-medium);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .toast {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(rippleStyles);

// Initialize the site
const site = new ElectricianSite();

// Service Worker Registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ElectricianSite;
}

// Performance monitoring
if (typeof PerformanceObserver !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'first-input') {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
            if (entry.entryType === 'layout-shift') {
                console.log('CLS:', entry.value);
            }
        });
    });
    
    try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
        console.log('Performance Observer not fully supported');
    }
}

// Console message for developers
console.log(`
🔌 Utah County Electrician Website
📱 Mobile-first, performance-optimized
⚡ Built for speed and conversions
🎯 All interactions tracked and optimized

Need electrical work? Call (801) 555-0123
`);