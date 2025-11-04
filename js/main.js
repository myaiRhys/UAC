// Main JavaScript for UAC Services Website
// Modern Design with Enhanced Animations

// Initialize EmailJS (if configured)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY');
    }

    console.log('🚀 UAC Services website loaded with modern animations');
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation to improve performance
            // animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.product-card, .overview-card, .reason-card, .contact-form, .contact-info-container, .map-container, .about-text, .placeholder-image'
    );

    animatedElements.forEach((el, index) => {
        // Add base animation class
        el.classList.add('animate-on-scroll');

        // Stagger animation delays for a cascading effect
        el.style.transitionDelay = `${index * 0.05}s`;

        // Observe the element
        animationObserver.observe(el);
    });
});

// ========================================
// NAVBAR ENHANCEMENTS
// ========================================

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// ========================================
// MOBILE NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple effect styles dynamically
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ========================================
// CONTACT FORM HANDLER
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                // Send email using EmailJS
                if (typeof emailjs !== 'undefined') {
                    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', {
                        from_name: formData.name,
                        from_company: formData.company,
                        from_email: formData.email,
                        from_phone: formData.phone,
                        message: formData.message,
                        to_email: 'uac@gmail.com'
                    });

                    // Show success message with animation
                    if (formMessage) {
                        formMessage.className = 'form-message success';
                        formMessage.textContent = '✓ Thank you for your message! We\'ll get back to you soon.';

                        // Scroll message into view
                        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }

                    // Reset form
                    contactForm.reset();
                } else {
                    // EmailJS not configured - show message
                    console.log('Contact form submission:', formData);
                    if (formMessage) {
                        formMessage.className = 'form-message success';
                        formMessage.textContent = '✓ Form submitted! (EmailJS not configured - check console for data)';
                    }
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Contact form error:', error);
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = '✗ There was an error sending your message. Please try again or contact us directly at uac@gmail.com';
                }
            } finally {
                // Restore button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');

                // Clear message after 7 seconds
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                        formMessage.className = 'form-message';
                    }
                }, 7000);
            }
        });
    }
});

// ========================================
// SMOOTH SCROLLING
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// FORM INPUT ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        // Focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });

        // Blur animation
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });

        // Remove error state on input
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(240, 40, 73)') {
                this.style.borderColor = '';
            }
        });
    });
});

// ========================================
// QUANTITY BUTTON ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add animation to quantity displays when they change
    const observeQuantityChanges = () => {
        const quantities = document.querySelectorAll('.cart-item-details');

        quantities.forEach(qty => {
            const quantityDisplay = qty.querySelector('span');
            if (quantityDisplay) {
                // Watch for changes
                const observer = new MutationObserver(() => {
                    quantityDisplay.style.transform = 'scale(1.3)';
                    quantityDisplay.style.color = 'var(--primary-color)';

                    setTimeout(() => {
                        quantityDisplay.style.transform = 'scale(1)';
                        quantityDisplay.style.color = '';
                    }, 200);
                });

                observer.observe(quantityDisplay, {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
        });
    };

    // Initial observation
    setTimeout(observeQuantityChanges, 1000);

    // Re-observe when cart updates
    document.addEventListener('cartUpdated', observeQuantityChanges);
});

// ========================================
// ADD TO CART ANIMATION
// ========================================

// Enhanced notification with icon
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const icon = type === 'success' ? '✓' : '✗';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: -400px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #42b72a 0%, #5cd63c 100%)' : 'linear-gradient(135deg, #f02849 0%, #ff4757 100%)'};
        color: white;
        padding: 1rem 1.75rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInFromRight 0.5s ease forwards;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        min-width: 280px;
    `;

    notification.innerHTML = `
        <span style="font-size: 1.5rem; font-weight: 700;">${icon}</span>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Slide out animation
    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInFromRight {
        from {
            right: -400px;
            opacity: 0;
        }
        to {
            right: 20px;
            opacity: 1;
        }
    }

    @keyframes slideOutToRight {
        from {
            right: 20px;
            opacity: 1;
        }
        to {
            right: -400px;
            opacity: 0;
        }
    }

    .loading {
        position: relative;
        pointer-events: none;
    }

    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spinner 0.6s linear infinite;
    }

    @keyframes spinner {
        to { transform: rotate(360deg); }
    }

    .input-focused {
        transform: scale(1.01);
        transition: transform 0.2s ease;
    }

    /* Shopping cart icon bounce */
    @keyframes cartBounce {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-5px) scale(1.1);
        }
    }

    .cart-icon-animate {
        animation: cartBounce 0.5s ease;
    }
`;
document.head.appendChild(notificationStyles);

// ========================================
// FORM VALIDATION HELPER
// ========================================

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#f02849';
            input.style.animation = 'shake 0.5s ease';
        } else {
            input.style.borderColor = '';

            // Additional validation for specific input types
            if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                input.style.borderColor = '#f02849';
                input.style.animation = 'shake 0.5s ease';
            }

            if (input.type === 'tel' && !isValidPhone(input.value)) {
                isValid = false;
                input.style.borderColor = '#f02849';
                input.style.animation = 'shake 0.5s ease';
            }
        }
    });

    return isValid;
}

// Add shake animation for validation errors
const shakeStyles = document.createElement('style');
shakeStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyles);

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format currency
function formatCurrency(amount) {
    return `R${amount.toFixed(2)}`;
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (South African format)
function isValidPhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    const re = /^(\+27|0)[0-9]{9}$/;
    return re.test(cleaned);
}

// Copy to clipboard utility
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied to clipboard!');
    }
}

// Print order summary
function printOrderSummary(orderId) {
    window.print();
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Throttle function for resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// LAZY LOADING IMAGES (if implemented)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ========================================
// EXPORT UTILITIES
// ========================================

window.UAC = {
    formatCurrency,
    isValidEmail,
    isValidPhone,
    validateForm,
    copyToClipboard,
    showNotification,
    debounce,
    throttle
};

// ========================================
// INITIALIZATION COMPLETE
// ========================================

console.log('✓ UAC Services website initialized with modern features');
console.log('✓ Scroll animations active');
console.log('✓ Micro-interactions enabled');
console.log('✓ Glassmorphism effects applied');
console.log('Remember to configure EmailJS with your credentials in main.js and checkout.js');
