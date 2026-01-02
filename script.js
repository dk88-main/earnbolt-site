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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Intersection Observer for animations
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

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .tournament-card, .support-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 100000) {
        return Math.floor(num / 1000) + 'K+';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'K+';
    }
    return num.toString();
}

// Start counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers[0].textContent = '0'; // Players
            statNumbers[1].textContent = '₹0'; // Prize Pool
            statNumbers[2].textContent = '0%'; // Withdrawal
            
            setTimeout(() => {
                animateCounter(statNumbers[0], 50000);
                // For prize pool
                let prizeStart = 0;
                const prizeTimer = setInterval(() => {
                    prizeStart += 5000;
                    if (prizeStart >= 1000000) {
                        statNumbers[1].textContent = '₹10L+';
                        clearInterval(prizeTimer);
                    } else {
                        statNumbers[1].textContent = '₹' + Math.floor(prizeStart / 100000) + 'L+';
                    }
                }, 32);
                
                // For withdrawal percentage
                let percentStart = 0;
                const percentTimer = setInterval(() => {
                    percentStart += 2;
                    if (percentStart >= 100) {
                        statNumbers[2].textContent = '100%';
                        clearInterval(percentTimer);
                    } else {
                        statNumbers[2].textContent = percentStart + '%';
                    }
                }, 32);
            }, 500);
            
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Tournament timer countdown
function updateTournamentTimers() {
    const timerElements = document.querySelectorAll('.tournament-card .info-item span');
    
    timerElements.forEach(timer => {
        if (timer.textContent.includes('Hours Left') || timer.textContent.includes('Hour Left')) {
            const currentText = timer.textContent;
            const hours = parseInt(currentText.match(/\d+/));
            
            if (hours > 0) {
                const newHours = Math.max(0, hours - Math.floor(Math.random() * 0.1));
                const minutes = Math.floor(Math.random() * 60);
                timer.textContent = `${newHours}h ${minutes}m Left`;
            }
        }
    });
}

// Update timers every minute
setInterval(updateTournamentTimers, 60000);

// Add click effects to buttons
document.querySelectorAll('.btn, .btn-join, .btn-support').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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
    .btn, .btn-join, .btn-support {
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

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize loading styles
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-buttons');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
});

// Download button interactions
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show download message
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><div><span>Preparing</span><strong>Download...</strong></div>';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i><div><span>Ready to</span><strong>Install</strong></div>';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.pointerEvents = 'auto';
            }, 2000);
        }, 3000);
    });
});

// Tournament join button interactions
document.querySelectorAll('.btn-join').forEach(btn => {
    btn.addEventListener('click', () => {
        const originalText = btn.textContent;
        btn.textContent = 'Joining...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Joined Successfully!';
            btn.style.background = '#2ed573';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }, 2000);
    });
});

// Support button interactions
document.querySelectorAll('.btn-support').forEach(btn => {
    btn.addEventListener('click', () => {
        const supportType = btn.textContent.trim();
        let message = '';
        
        switch(supportType) {
            case 'Start Chat':
                message = 'Opening live chat...';
                break;
            case 'Call Now':
                message = 'Connecting call...';
                break;
            case 'Send Email':
                message = 'Opening email client...';
                break;
        }
        
        const originalText = btn.textContent;
        btn.textContent = message;
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    });
});

// Add dynamic tournament status updates
function updateTournamentStatus() {
    const liveStatus = document.querySelectorAll('.tournament-status.live');
    liveStatus.forEach(status => {
        // Add blinking effect for live tournaments
        status.style.animation = 'pulse 1.5s infinite';
    });
}

// Initialize tournament status
document.addEventListener('DOMContentLoaded', updateTournamentStatus);

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #f7931e);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

console.log('🎮 Game Bazzi Website Loaded Successfully! 🎮');
console.log('🔥 Ready for Free Fire Tournaments! 🔥');