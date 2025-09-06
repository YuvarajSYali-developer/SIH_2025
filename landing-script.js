// Modern Landing Page JavaScript with Smooth Effects
class ModernLandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimations();
        this.setupScrollEffects();
        this.setupParallaxEffect();
        this.setupFadeInAnimations();
        
        // Initialize after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupInteractions();
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-value[data-target]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOutCubic;
            
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    setupScrollEffects() {
        // Parallax scrolling effect
        document.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const parallaxSections = document.querySelectorAll('.parallax-section');
            
            parallaxSections.forEach(section => {
                const bg = section.querySelector('.parallax-bg');
                if (bg) {
                    const rect = section.getBoundingClientRect();
                    const offset = rect.top + scrollY;
                    const speed = 0.5;
                    const yPos = (offset - scrollY) * speed;
                    bg.style.transform = `translateY(${yPos}px)`;
                }
            });

            // Update hero background opacity based on scroll
            const heroBackground = document.querySelector('.hero-bg');
            if (heroBackground) {
                const opacity = Math.max(0.1, 0.3 - (scrollY / 1000));
                heroBackground.style.opacity = opacity;
            }
        });
    }

    setupParallaxEffect() {
        // Enhanced parallax effect for better performance
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.scrollY;
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 - (index * 0.1); // Different speeds for different elements
                const yPos = scrollY * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        };
        
        document.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    setupFadeInAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    // Add staggered animation delay for multiple elements
                    const elements = entry.target.querySelectorAll('.animated-card');
                    elements.forEach((el, index) => {
                        el.style.animationDelay = `${index * 0.1}s`;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('.fade-in, .animated-card, section').forEach(el => {
            observer.observe(el);
        });
    }

    setupInteractions() {
        // Button ripple effects
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
        }

        // Active navigation link highlighting
        this.setupActiveNavigation();
        
        // Add loading states to navigation buttons
        this.setupNavigationLoading();
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupNavigationLoading() {
        document.querySelectorAll('a[href$=".html"]').forEach(link => {
            link.addEventListener('click', (e) => {
                // Add loading state
                const originalText = link.innerHTML;
                link.innerHTML = `
                    <span class="relative z-10">
                        <i class="fas fa-spinner fa-spin mr-2"></i>
                        Loading...
                    </span>
                `;
                
                // Reset after navigation (in case it fails)
                setTimeout(() => {
                    link.innerHTML = originalText;
                }, 3000);
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('text-blue-400');
                        link.classList.add('text-white');
                    });
                    
                    // Add active class to current nav link
                    const activeLink = document.querySelector(`[href="#${targetId}"]`);
                    if (activeLink) {
                        activeLink.classList.remove('text-white');
                        activeLink.classList.add('text-blue-400');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Utility method to add dynamic stats
    updateStats(newStats) {
        Object.keys(newStats).forEach(key => {
            const element = document.querySelector(`[data-target="${key}"]`);
            if (element) {
                element.setAttribute('data-target', newStats[key]);
                this.animateCounter(element);
            }
        });
    }

    // Method to trigger animations manually
    triggerAnimations() {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.remove('fade-in');
            setTimeout(() => {
                el.classList.add('fade-in');
            }, 100);
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Initialize the landing page
const landingPage = new ModernLandingPage();

// Performance monitoring
window.addEventListener('load', () => {
    console.log('Landing page loaded successfully');
    
    // Add performance metrics if needed
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Export for potential external use
window.LandingPage = landingPage;
