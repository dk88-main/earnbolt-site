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
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Earnings calculator
const adsSlider = document.getElementById('ads');
const tasksSlider = document.getElementById('tasks');
const referralsSlider = document.getElementById('referrals');
const adsValue = document.getElementById('ads-value');
const tasksValue = document.getElementById('tasks-value');
const referralsValue = document.getElementById('referrals-value');
const monthlyEarning = document.getElementById('monthly-earning');

function updateCalculator() {
    const ads = parseInt(adsSlider.value);
    const tasks = parseInt(tasksSlider.value);
    const referrals = parseInt(referralsSlider.value);
    
    adsValue.textContent = ads;
    tasksValue.textContent = tasks;
    referralsValue.textContent = referrals;
    
    // Calculate earnings (example rates)
    const adEarning = ads * 8 * 30; // 8 coins per ad, 30 days
    const taskEarning = tasks * 100 * 30; // 100 coins per task, 30 days
    const referralEarning = referrals * 300; // 300 coins per referral
    
    const totalCoins = adEarning + taskEarning + referralEarning;
    const totalRupees = Math.floor(totalCoins / 100); // 100 coins = ₹1
    
    monthlyEarning.textContent = totalRupees;
}

adsSlider.addEventListener('input', updateCalculator);
tasksSlider.addEventListener('input', updateCalculator);
referralsSlider.addEventListener('input', updateCalculator);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 20, 25, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 20, 25, 0.95)';
    }
});

// Animate elements on scroll
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

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe steps
document.querySelectorAll('.step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(step);
});

// Add floating animation to coins
document.addEventListener('DOMContentLoaded', () => {
    const coins = document.querySelectorAll('.coins-animation i');
    coins.forEach((coin, index) => {
        coin.style.animationDelay = `${index * 0.5}s`;
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn, .download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
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

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn, .download-btn {
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
document.head.appendChild(style);