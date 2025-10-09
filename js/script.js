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

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate all counters
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
    });
    
    // Initialize XP bar
    const xpFill = document.querySelector('.xp-fill');
    if (xpFill) {
        const xpPercent = xpFill.getAttribute('data-xp');
        setTimeout(() => {
            xpFill.style.width = xpPercent + '%';
        }, 500);
    }
    
    // Initialize quest progress bars
    const progressBars = document.querySelectorAll('.progress-fill[data-progress]');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 1000);
    });
    
    // Floating coins animation
    createFloatingCoins();
    
    // Achievement popup animation
    setTimeout(() => {
        const achievementPopup = document.querySelector('.achievement-popup');
        if (achievementPopup) {
            achievementPopup.style.opacity = '1';
            achievementPopup.style.transform = 'translateY(0)';
        }
    }, 3000);
});

// Create floating coins
function createFloatingCoins() {
    const coinsContainer = document.querySelector('.floating-coins');
    if (!coinsContainer) return;
    
    setInterval(() => {
        if (coinsContainer.children.length < 8) {
            const coin = document.createElement('i');
            coin.className = 'fas fa-coins coin';
            coin.style.left = Math.random() * 100 + '%';
            coin.style.animationDuration = (Math.random() * 3 + 5) + 's';
            coin.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            coinsContainer.appendChild(coin);
            
            setTimeout(() => {
                coin.remove();
            }, 8000);
        }
    }, 2000);
}

// Earnings calculator with gaming effects
const adsSlider = document.getElementById('ads');
const tasksSlider = document.getElementById('tasks');
const referralsSlider = document.getElementById('referrals');
const adsValue = document.getElementById('ads-value');
const tasksValue = document.getElementById('tasks-value');
const referralsValue = document.getElementById('referrals-value');
const monthlyEarning = document.getElementById('monthly-earning');
const adsEarning = document.getElementById('ads-earning');
const tasksEarning = document.getElementById('tasks-earning');
const referralsEarning = document.getElementById('referrals-earning');

function updateCalculator() {
    if (!adsSlider || !tasksSlider || !referralsSlider) return;
    
    const ads = parseInt(adsSlider.value);
    const tasks = parseInt(tasksSlider.value);
    const referrals = parseInt(referralsSlider.value);
    
    // Update display values
    if (adsValue) adsValue.textContent = ads;
    if (tasksValue) tasksValue.textContent = tasks;
    if (referralsValue) referralsValue.textContent = referrals;
    
    // Calculate earnings (enhanced rates)
    const adEarning = ads * 12 * 30; // 12 coins per ad, 30 days
    const taskEarning = tasks * 150 * 30; // 150 coins per task, 30 days
    const referralEarning = referrals * 500; // 500 coins per referral
    
    const totalCoins = adEarning + taskEarning + referralEarning;
    const totalRupees = Math.floor(totalCoins / 100); // 100 coins = ₹1
    
    // Update earnings display with animation
    if (monthlyEarning) {
        animateCounter(monthlyEarning, totalRupees, 1000);
    }
    
    // Update breakdown
    if (adsEarning) adsEarning.textContent = '₹' + Math.floor(adEarning / 100);
    if (tasksEarning) tasksEarning.textContent = '₹' + Math.floor(taskEarning / 100);
    if (referralsEarning) referralsEarning.textContent = '₹' + Math.floor(referralEarning / 100);
    
    // Add coin animation effect
    createCoinBurst();
}

// Create coin burst effect
function createCoinBurst() {
    const earningsCard = document.querySelector('.earnings-card');
    if (!earningsCard) return;
    
    for (let i = 0; i < 5; i++) {
        const coin = document.createElement('i');
        coin.className = 'fas fa-coins';
        coin.style.position = 'absolute';
        coin.style.color = '#ffd700';
        coin.style.fontSize = '1rem';
        coin.style.pointerEvents = 'none';
        coin.style.left = '50%';
        coin.style.top = '50%';
        coin.style.transform = 'translate(-50%, -50%)';
        coin.style.animation = `coinBurst 1s ease-out forwards`;
        coin.style.animationDelay = i * 0.1 + 's';
        
        earningsCard.appendChild(coin);
        
        setTimeout(() => {
            coin.remove();
        }, 1000);
    }
}

// Add coin burst animation to CSS
const coinBurstStyle = document.createElement('style');
coinBurstStyle.textContent = `
    @keyframes coinBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(coinBurstStyle);

// Add event listeners for calculator
if (adsSlider) adsSlider.addEventListener('input', updateCalculator);
if (tasksSlider) tasksSlider.addEventListener('input', updateCalculator);
if (referralsSlider) referralsSlider.addEventListener('input', updateCalculator);

// Leaderboard tabs
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add tab switch animation
        const leaderboardContent = document.querySelector('.leaderboard-content');
        if (leaderboardContent) {
            leaderboardContent.style.opacity = '0';
            leaderboardContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                leaderboardContent.style.opacity = '1';
                leaderboardContent.style.transform = 'translateY(0)';
            }, 200);
        }
    });
});

// Navbar background on scroll with gaming effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        navbar.style.borderBottom = '2px solid rgba(255, 215, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.borderBottom = '2px solid rgba(255, 215, 0, 0.2)';
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
            
            // Add special effects for quest cards
            if (entry.target.classList.contains('quest-card')) {
                entry.target.style.animation = 'questCardAppear 0.8s ease-out forwards';
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe quest cards
    document.querySelectorAll('.quest-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        card.style.transitionDelay = index * 0.2 + 's';
        observer.observe(card);
    });
    
    // Observe leaderboard items
    document.querySelectorAll('.leaderboard-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = index * 0.1 + 's';
        observer.observe(item);
    });
});

// Add quest card appear animation
const questCardStyle = document.createElement('style');
questCardStyle.textContent = `
    @keyframes questCardAppear {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        50% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.02);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(questCardStyle);

// Button click effects with gaming feedback
document.querySelectorAll('.game-btn, .download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
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
        
        // Create coin effect for primary buttons
        if (this.classList.contains('primary')) {
            createButtonCoinEffect(this);
        }
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Create coin effect for button clicks
function createButtonCoinEffect(button) {
    for (let i = 0; i < 3; i++) {
        const coin = document.createElement('i');
        coin.className = 'fas fa-coins';
        coin.style.position = 'absolute';
        coin.style.color = '#ffd700';
        coin.style.fontSize = '1.2rem';
        coin.style.pointerEvents = 'none';
        coin.style.left = '50%';
        coin.style.top = '50%';
        coin.style.transform = 'translate(-50%, -50%)';
        coin.style.animation = `buttonCoinEffect 1s ease-out forwards`;
        coin.style.animationDelay = i * 0.1 + 's';
        
        button.appendChild(coin);
        
        setTimeout(() => {
            coin.remove();
        }, 1000);
    }
}

// Add button coin effect animation
const buttonCoinStyle = document.createElement('style');
buttonCoinStyle.textContent = `
    .game-btn, .download-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
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
    
    @keyframes buttonCoinEffect {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(${Math.random() * 100 - 50}px, -80px) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(buttonCoinStyle);

// Live stats animation
function updateLiveStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const baseValue = parseInt(stat.getAttribute('data-count'));
        const variation = Math.floor(Math.random() * 100) - 50;
        const newValue = Math.max(0, baseValue + variation);
        
        if (Math.abs(newValue - currentValue) > 10) {
            animateCounter(stat, newValue, 1000);
        }
    });
}

// Update live stats every 10 seconds
setInterval(updateLiveStats, 10000);

// Achievement notification system
function showAchievement(title, description, icon = 'fas fa-trophy') {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-notification';
    achievement.innerHTML = `
        <i class="${icon}"></i>
        <div class="achievement-content">
            <div class="achievement-title">${title}</div>
            <div class="achievement-desc">${description}</div>
        </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        achievement.classList.remove('show');
        setTimeout(() => {
            achievement.remove();
        }, 300);
    }, 4000);
}

// Add achievement notification styles
const achievementStyle = document.createElement('style');
achievementStyle.textContent = `
    .achievement-notification {
        position: fixed;
        top: 100px;
        right: -400px;
        background: linear-gradient(45deg, #ffd700, #ffb347);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        z-index: 10000;
        transition: right 0.3s ease;
        max-width: 350px;
    }
    
    .achievement-notification.show {
        right: 20px;
    }
    
    .achievement-notification i {
        font-size: 2rem;
        animation: achievementGlow 1s infinite;
    }
    
    .achievement-title {
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .achievement-desc {
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    @keyframes achievementGlow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(achievementStyle);

// Trigger sample achievements
setTimeout(() => {
    showAchievement('Welcome!', 'You discovered EarnBolt!', 'fas fa-star');
}, 2000);

setTimeout(() => {
    showAchievement('Explorer', 'Viewing earning potential!', 'fas fa-search');
}, 8000);

// Add particle system for background
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    document.body.appendChild(particleContainer);
    
    setInterval(() => {
        if (particleContainer.children.length < 15) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear forwards;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 20000);
        }
    }, 1000);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    createParticleSystem();
});

// Add sound effects (optional - can be enabled later)
function playSound(type) {
    // Placeholder for sound effects
    // Can add Web Audio API sounds later
    console.log(`Playing ${type} sound effect`);
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effects
    document.querySelectorAll('.game-btn, .quest-card, .download-btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            playSound('hover');
        });
        
        element.addEventListener('click', () => {
            playSound('click');
        });
    });
});

console.log('🎮 EarnBolt Gaming Website Loaded! 🚀');