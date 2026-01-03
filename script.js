// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
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

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Counter animation
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
    if (num >= 10000000) {
        return '₹' + Math.floor(num / 10000000) + 'Cr+';
    } else if (num >= 100000) {
        return '₹' + Math.floor(num / 100000) + 'L+';
    } else if (num >= 1000000) {
        return Math.floor(num / 1000000) + 'M+';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'K+';
    }
    return num.toString();
}

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
            
            // Animate counters when hero section is visible
            if (entry.target.classList.contains('hero')) {
                animateHeroCounters();
            }
            
            // Animate progress bars
            if (entry.target.classList.contains('tournaments')) {
                animateProgressBars();
            }
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.tournament-item, .feature-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // Observe tournaments section
    const tournamentsSection = document.querySelector('.tournaments');
    if (tournamentsSection) {
        observer.observe(tournamentsSection);
    }
});

// Animate hero counters
function animateHeroCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length >= 3) {
        // Players counter
        animateCounter(statNumbers[0], 1000000);
        
        // Prize pool counter
        animateCounter(statNumbers[1], 50000000);
        
        // Tournaments counter
        animateCounter(statNumbers[2], 500);
    }
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Tournament button interactions
document.querySelectorAll('.tournament-btn, .join-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Joining...</span>';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> <span>Joined Successfully!</span>';
            this.style.background = 'linear-gradient(135deg, #27AE60, #2ECC71)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                this.style.background = '';
            }, 2000);
        }, 2000);
    });
});

// Download button interactions
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const platform = this.classList.contains('android') ? 'Android' : 'iOS';
        const originalContent = this.innerHTML;
        
        // Direct download link from Google Drive
        const apkDownloadUrl = 'https://drive.google.com/uc?export=download&id=1iSyTWLMG2ukgYIT_s9lI1quLw_X2dpFk';
        
        this.innerHTML = `
            <div class="btn-icon">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="btn-text">
                <span>Starting</span>
                <strong>Download</strong>
            </div>
        `;
        
        this.style.pointerEvents = 'none';
        
        // Start download
        const link = document.createElement('a');
        link.href = apkDownloadUrl;
        link.download = 'GameBazzi.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
            this.innerHTML = `
                <div class="btn-icon">
                    <i class="fas fa-check"></i>
                </div>
                <div class="btn-text">
                    <span>Download</span>
                    <strong>Started</strong>
                </div>
            `;
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.pointerEvents = 'auto';
            }, 2000);
        }, 1000);
    });
});

// Button ripple effect
document.querySelectorAll('button, .btn-hero, .tournament-btn').forEach(button => {
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

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    button, .btn-hero, .tournament-btn {
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

// Live tournament updates
function updateTournamentData() {
    const playerCounts = document.querySelectorAll('.detail span, .players span');
    
    playerCounts.forEach(count => {
        if (count.textContent.includes('/')) {
            const parts = count.textContent.split(' / ');
            if (parts.length === 2) {
                const current = parseInt(parts[0].replace(/,/g, ''));
                const max = parseInt(parts[1].replace(/,/g, ''));
                
                if (current < max) {
                    const increment = Math.floor(Math.random() * 20) + 1;
                    const newCount = Math.min(max, current + increment);
                    count.textContent = newCount.toLocaleString() + ' / ' + max.toLocaleString() + (parts[1].includes('Players') ? ' Players' : parts[1].includes('Teams') ? ' Teams' : '');
                }
            }
        }
    });
}

// Update tournament data every 10 seconds
setInterval(updateTournamentData, 10000);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgPattern = document.querySelector('.bg-pattern');
    
    if (bgPattern) {
        bgPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize hero animations
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
});

// Console welcome message
console.log(`
🎮 Game Bazzi - Free Fire Tournament Platform 🎮
🔥 Clean & Modern Design Loaded Successfully! 🔥
💰 Start earning money by playing Free Fire! 💰
`);

// Performance optimization
const throttle = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const bgPattern = document.querySelector('.bg-pattern');
    
    if (bgPattern) {
        bgPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);
// Screenshots slider functionality
let currentSlideIndex = 1;
const totalSlides = 12;

function showSlide(n) {
    const slides = document.querySelectorAll('.screenshot-item');
    const dots = document.querySelectorAll('.dot');
    
    if (n > totalSlides) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = totalSlides;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Auto-play screenshots
function autoPlaySlides() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

// Initialize screenshots
document.addEventListener('DOMContentLoaded', () => {
    showSlide(1);
    
    // Auto-play every 5 seconds
    setInterval(autoPlaySlides, 5000);
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    }
}