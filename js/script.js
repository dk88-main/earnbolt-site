// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Earnings Calculator
const adsSlider = document.getElementById('ads-slider');
const tasksSlider = document.getElementById('tasks-slider');
const referralsSlider = document.getElementById('referrals-slider');
const adsValue = document.getElementById('ads-value');
const tasksValue = document.getElementById('tasks-value');
const referralsValue = document.getElementById('referrals-value');
const totalAmount = document.getElementById('total-amount');
const adsEarning = document.getElementById('ads-earning');
const tasksEarning = document.getElementById('tasks-earning');
const referralsEarning = document.getElementById('referrals-earning');

function updateCalculator() {
    const ads = parseInt(adsSlider.value);
    const tasks = parseInt(tasksSlider.value);
    const referrals = parseInt(referralsSlider.value);
    
    // Update slider values
    adsValue.textContent = ads;
    tasksValue.textContent = tasks;
    referralsValue.textContent = referrals;
    
    // Calculate earnings
    const dailyAdEarning = ads * 10; // ₹10 per ad
    const monthlyAdEarning = dailyAdEarning * 30;
    
    const dailyTaskEarning = tasks * 75; // ₹75 per task
    const monthlyTaskEarning = dailyTaskEarning * 30;
    
    const monthlyReferralEarning = referrals * 100; // ₹100 per referral
    
    const totalMonthly = monthlyAdEarning + monthlyTaskEarning + monthlyReferralEarning;
    
    // Update display
    animateValue(totalAmount, parseInt(totalAmount.textContent.replace(/,/g, '')), totalMonthly, 1000);
    adsEarning.textContent = '₹' + monthlyAdEarning.toLocaleString();
    tasksEarning.textContent = '₹' + monthlyTaskEarning.toLocaleString();
    referralsEarning.textContent = '₹' + monthlyReferralEarning.toLocaleString();
}

// Animate number counting
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Add event listeners for calculator
if (adsSlider) {
    adsSlider.addEventListener('input', updateCalculator);
    tasksSlider.addEventListener('input', updateCalculator);
    referralsSlider.addEventListener('input', updateCalculator);
    
    // Initialize calculator
    updateCalculator();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe steps
    document.querySelectorAll('.step').forEach(step => {
        observer.observe(step);
    });
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        
        if (numericTarget && numericTarget > 0) {
            let current = 0;
            const increment = numericTarget / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    if (target.includes('K')) {
                        counter.textContent = Math.floor(current / 1000) + 'K+';
                    } else if (target.includes('L')) {
                        counter.textContent = '₹' + Math.floor(current / 100000) + 'L+';
                    } else if (target.includes('★')) {
                        counter.textContent = (current / 10).toFixed(1) + '★';
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }
            }, 20);
        }
    });
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary, .nav-cta {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add hover effects for cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .hero-badge {
        animation-delay: 0.2s;
    }
    
    .hero-title {
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    .hero-description {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    .hero-stats {
        animation: fadeInUp 0.8s ease-out 0.8s both;
    }
    
    .hero-buttons {
        animation: fadeInUp 0.8s ease-out 1s both;
    }
    
    .phone {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
`;
document.head.appendChild(loadingStyle);

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    revealObserver.observe(section);
});

// Add click tracking for download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // You can add actual download logic here
        console.log('Download button clicked:', btn.textContent);
        
        // For demo purposes, show an alert
        alert('Download will start soon! This is a demo website.');
    });
});

// Add form validation for any future forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('a, button, input, select, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #6366f1';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Performance optimization - lazy load images
const images = document.querySelectorAll('img[data-src]');
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

images.forEach(img => imageObserver.observe(img));

console.log('🚀 EarnBolt Website Loaded Successfully!');