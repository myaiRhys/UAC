// Main JavaScript for UAC Services Website
// Simplified Single-Page Marketing Site

// Initialize EmailJS (if configured)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY');
    }

    console.log('UAC Services website loaded');
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
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.product-card, .reason-card, .contact-form, .contact-info-container, .bulk-content'
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
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
                company: document.getElementById('company').value,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value || 'Not provided',
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
                        from_company: formData.company,
                        from_name: formData.name,
                        from_phone: formData.phone,
                        from_email: formData.email,
                        message: formData.message,
                        to_email: 'uac@gmail.com'
                    });

                    // Show success message with animation
                    if (formMessage) {
                        formMessage.className = 'form-message success';
                        formMessage.textContent = 'Thank you for your enquiry! We\'ll get back to you soon.';

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
                        formMessage.textContent = 'Form submitted! (EmailJS not configured - check console for data)';
                    }
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Contact form error:', error);
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'There was an error sending your message. Please call us directly at 082 826 1003';
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

// Form validation helper
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
            if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
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
`;
document.head.appendChild(shakeStyles);

// ========================================
// EXPORT UTILITIES
// ========================================

window.UAC = {
    formatCurrency,
    isValidEmail,
    isValidPhone,
    validateForm
};

// ========================================
// INITIALIZATION COMPLETE
// ========================================

console.log('UAC Services - Single Page Marketing Site');
console.log('To configure email functionality, update EmailJS credentials in main.js');
