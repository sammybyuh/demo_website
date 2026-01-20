// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip sandstorm link
        if (this.id === 'sandstorm-link') {
            return;
        }
        
        const href = this.getAttribute('href');
        
        // Skip empty hashes
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.08)';
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

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .pricing-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
}

// Add active state to current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero background
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (hero && heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let startTime = null;
    const startValue = 0;
    
    const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(animation);
};

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
                const suffix = text.replace(/[0-9]/g, '');
                animateCounter(statNumber, number);
                
                setTimeout(() => {
                    statNumber.textContent = text;
                }, 2000);
            }
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const stats = document.querySelectorAll('.stat');
stats.forEach(stat => statsObserver.observe(stat));

// Lazy loading for portfolio images (if you add real images)
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

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Portfolio item click handler
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        // In a real application, this could open a modal with project details
        const projectName = this.querySelector('h3').textContent;
        console.log('Portfolio item clicked:', projectName);
        // You could add modal functionality here
    });
});

// John Cena audio easter egg with better browser support
let cenaAudio = null;
let audioReady = false;

// Darude - Sandstorm audio
let sandstormAudio = null;
let sandstormReady = false;

// Initialize Sandstorm audio
function initSandstorm() {
    if (!sandstormAudio) {
        sandstormAudio = new Audio('https://www.myinstants.com/media/sounds/darude-sandstorm.mp3');
        sandstormAudio.volume = 0.5;
        sandstormAudio.load();
        sandstormReady = true;
        console.log('🎵 Sandstorm loaded!');
    }
}

// Play Sandstorm
function playSandstorm() {
    if (!sandstormReady) {
        initSandstorm();
    }
    
    if (sandstormReady && sandstormAudio) {
        console.log('🎵 Playing Sandstorm...');
        sandstormAudio.currentTime = 0;
        sandstormAudio.play()
            .then(() => {
                console.log('🎵 Sandstorm playing!');
            })
            .catch(err => {
                console.log('❌ Audio play prevented:', err.message);
            });
    }
}

// Sandstorm link click handler
const sandstormLink = document.getElementById('sandstorm-link');
if (sandstormLink) {
    sandstormLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent John Cena from triggering
        initSandstorm();
        playSandstorm();
    });
}

// Initialize audio
function initAudio() {
    if (!cenaAudio) {
        cenaAudio = new Audio('https://www.myinstants.com/media/sounds/john-cena.mp3');
        cenaAudio.volume = 0.5;
        cenaAudio.load();
        audioReady = true;
        console.log('🎺 John Cena audio loaded!');
    }
}

// Play the John Cena audio
function playCena() {
    if (!audioReady) {
        initAudio();
    }
    
    if (audioReady && cenaAudio) {
        console.log('🎺 Playing John Cena...');
        cenaAudio.currentTime = 0;
        cenaAudio.play()
            .then(() => {
                console.log('🎺 Audio playing!');
            })
            .catch(err => {
                console.log('❌ Audio play prevented:', err.message);
            });
    }
}

// Play on page load (with a slight delay to ensure it works)
window.addEventListener('load', () => {
    setTimeout(() => {
        initAudio();
        playCena();
    }, 500);
});

// Play John Cena sound on navbar link clicks
document.addEventListener('click', (e) => {
    // Skip if it's the Sandstorm link
    if (e.target.id === 'sandstorm-link' || e.target.closest('#sandstorm-link')) {
        return;
    }
    
    // Check if clicked element is a navbar link or button
    const isNavLink = e.target.closest('.nav-menu a') || 
                      e.target.closest('.navbar a');
    const isButton = e.target.tagName === 'BUTTON' || 
                     e.target.tagName === 'A' && e.target.classList.contains('btn') ||
                     e.target.closest('button') || 
                     e.target.closest('.btn');
    
    if (isNavLink || isButton) {
        console.log('🎺 Navbar/Button clicked!');
        playCena();
    }
});

// Initialize audio on first user interaction
document.addEventListener('click', initAudio, { once: true });

console.log('WebForge website loaded successfully! 🚀');