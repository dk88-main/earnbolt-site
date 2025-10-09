// Smooth scrolling for navigation links
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

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Earnings Calculator
const adsSlider = document.getElementById('ads');
const tasksSlider = document.getElementById('tasks');
const referralsSlider = document.getElementById('referrals');
const adsValue = document.getElementById('ads-value');
const tasksValue = document.getElementById('tasks-value');
const referralsValue = document.getElementById('referrals-value');
const totalEarning = document.getElementById('total-earning');
const adsEarning = document.getElementById('ads-earning');
const tasksEarning = document.getElementById('tasks-earning');
const referralsEarning = document.getElementById('referrals-earning');

function updateCalculator() {
    if (!adsSlider || !tasksSlider || !referralsSlider) return;
    
    const ads = parseInt(adsSlider.value);
    const tasks = parseInt(tasksSlider.value);
    const referrals = parseInt(referralsSlider.value);
    
    // Update display values
    adsValue.textContent = ads;
    tasksValue.textContent = tasks;
    referralsValue.textContent = referrals;
    
    // Calculate earnings (realistic rates)
    const dailyAdEarning = ads * 10; // ₹10 per ad
    const monthlyAdEarning = dailyAdEarning * 30;
    
    const dailyTaskEarning = tasks * 75; // ₹75 per task
    const monthlyTaskEarning = dailyTaskEarning * 30;
    
    const monthlyReferralEarning = referrals * 100; // ₹100 per referral
    
    const totalMonthly = monthlyAdEarning + monthlyTaskEarning + monthlyReferralEarning;
    
    // Update display with animation
    animateValue(totalEarning, parseInt(totalEarning.textContent.replace(/,/g, '')), totalMonthly, 1000);
    
    // Update breakdown
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
    
    // Observe other sections
    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn').forEach(button => {
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
    .btn-primary, .btn-secondary, .cta-btn {
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

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero-badge {
        animation-delay: 0.2s;
    }
    
    .hero-title {
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    .hero-subtitle {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    .hero-stats {
        animation: fadeInUp 0.8s ease-out 0.8s both;
    }
    
    .hero-buttons {
        animation: fadeInUp 0.8s ease-out 1s both;
    }
    
    .phone-mockup {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
`;
document.head.appendChild(loadingStyle);

// Add hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects for testimonial cards
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

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            // Uncomment below line to enable typing effect
            // typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
        }
    }, 1000);
});

// Add smooth reveal animation for sections
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

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        
        if (numericTarget) {
            animateValue(counter, 0, numericTarget, 2000);
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

// Add mobile menu styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links a {
            font-size: 1.2rem;
            margin: 1rem 0;
            padding: 1rem 2rem;
            width: 80%;
            text-align: center;
            border-radius: 10px;
        }
        
        .mobile-menu.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

console.log('🚀 EarnBolt Website Loaded Successfully!');