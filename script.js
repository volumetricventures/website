// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'none';
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize EmailJS
emailjs.init('viSAgbcsIhmKOYnSm');

// reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6LcH2bQrAAAAAD5n84-VQEcDtBJg8aMHYFyInTRC';

// Form submission handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Blur all form inputs to retract keyboard on mobile
    document.activeElement.blur();
    contactForm.querySelectorAll('input, textarea').forEach(field => field.blur());
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create custom success/error message function
    const showMessage = (text, isError = false) => {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${isError ? '#ff4444' : '#000000'};
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.3s ease;
        `;
        
        // Add fade animations if not already added
        if (!document.getElementById('messageAnimations')) {
            const style = document.createElement('style');
            style.id = 'messageAnimations';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(message);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    };
    
    // Execute reCAPTCHA v3
    grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token) => {
            // EmailJS template parameters with reCAPTCHA token
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject || 'Website Contact Form',
                message: data.message,
                to_email: 'info@volumetricventures.com',
                'g-recaptcha-response': token // Include token for verification
            };
            
            // Send email using EmailJS
            emailjs.send('service_00gl3mk', 'YOUR_TEMPLATE_ID', templateParams)
                .then(() => {
                    showMessage('Thank you, we will be in contact soon.');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Email send failed:', error);
                    // Fallback to mailto if EmailJS fails
                    const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
                    const body = encodeURIComponent(
                        `Name: ${data.name}\n` +
                        `Email: ${data.email}\n` +
                        `Subject: ${data.subject || 'No subject'}\n\n` +
                        `Message:\n${data.message}`
                    );
                    window.location.href = `mailto:info@volumetricventures.com?subject=${subject}&body=${body}`;
                    showMessage('Opening your email client...');
                    contactForm.reset();
                });
        }).catch((error) => {
            console.error('reCAPTCHA failed:', error);
            showMessage('Security verification failed. Please try again.', true);
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Observe stat items for animation
document.querySelectorAll('.stat-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers[0] && animateCounter(statNumbers[0], 100);
            statNumbers[1] && animateCounter(statNumbers[1], 50);
            statNumbers[2] && animateCounter(statNumbers[2], 30);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}