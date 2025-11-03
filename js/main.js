// Main JavaScript for UAC Services Website

// Initialize EmailJS (if configured)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY');
    }
});

// Mobile Navigation Toggle
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

// Contact Form Handler
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

                    // Show success message
                    if (formMessage) {
                        formMessage.className = 'form-message success';
                        formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
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
                    formMessage.textContent = 'There was an error sending your message. Please try again or contact us directly at uac@gmail.com';
                }
            } finally {
                // Restore button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Clear message after 5 seconds
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                        formMessage.className = 'form-message';
                    }
                }, 5000);
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
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
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .overview-card, .reason-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility: Format currency
function formatCurrency(amount) {
    return `R${amount.toFixed(2)}`;
}

// Utility: Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility: Validate phone number (South African format)
function isValidPhone(phone) {
    // Remove spaces and check if it's a valid SA number
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
        } else {
            input.style.borderColor = '#dddfe2';

            // Additional validation for specific input types
            if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                input.style.borderColor = '#f02849';
            }

            if (input.type === 'tel' && !isValidPhone(input.value)) {
                isValid = false;
                input.style.borderColor = '#f02849';
            }
        }
    });

    return isValid;
}

// Add input listeners to remove error state on correction
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(240, 40, 73)') {
                input.style.borderColor = '#dddfe2';
            }
        });
    });
});

// Sticky Navigation on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Print order summary (optional feature)
function printOrderSummary(orderId) {
    window.print();
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

// Simple notification function (used by various parts of the app)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#42b72a' : '#f02849'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export utilities for use in other scripts
window.UAC = {
    formatCurrency,
    isValidEmail,
    isValidPhone,
    validateForm,
    copyToClipboard,
    showNotification
};

// Log initialization
console.log('UAC Services website initialized successfully');
console.log('Remember to configure EmailJS with your credentials in main.js and checkout.js');
