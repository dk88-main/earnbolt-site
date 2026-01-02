// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = Math.random() * 100 + '%';
        column.style.top = '-100px';
        column.style.color = '#00ff00';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.animation = `matrix-fall ${Math.random() * 3 + 2}s linear infinite`;
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }
}

// 3D Particle System
function create3DParticles() {
    const particleContainer = document.getElementById('particleSystem');
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = `0 0 20px currentColor`;
        particle.style.animation = `particle-3d ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Explosion Loader
function initExplosionLoader() {
    const loader = document.getElementById('explosionLoader');
    
    setTimeout(() => {
        loader.style.transform = 'scale(0)';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 4000);
}

// 3D Navigation Effects
function init3DNavigation() {
    const navLinks = document.querySelectorAll('.nav-link-3d');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotateX(10deg)';
            link.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)';
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(0) rotateX(0deg)';
                link.style.boxShadow = 'none';
            }
        });
    });
}

// Holographic Button Effects
function initHolographicButtons() {
    const megaButtons = document.querySelectorAll('.mega-btn');
    
    megaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            createButtonParticles(btn);
        });
        
        btn.addEventListener('click', (e) => {
            createExplosionEffect(e.target, e.clientX, e.clientY);
        });
    });
}

function createButtonParticles(button) {
    const particles = button.querySelector('.btn-particles');
    if (!particles) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00ffff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = 'particle-burst 1s ease-out forwards';
        particle.style.boxShadow = '0 0 10px #00ffff';
        
        particles.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function createExplosionEffect(element, x, y) {
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    explosion.style.width = '10px';
    explosion.style.height = '10px';
    explosion.style.background = 'radial-gradient(circle, #ff0080, #00ffff)';
    explosion.style.borderRadius = '50%';
    explosion.style.transform = 'translate(-50%, -50%)';
    explosion.style.animation = 'explosion-burst 0.6s ease-out forwards';
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '10000';
    
    document.body.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 600);
}

// 3D Stats Counter Animation
function animate3DCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                
                if (finalText.includes('M+')) {
                    animateNumber(target, 0, 5, 'M+', 2000);
                } else if (finalText.includes('CR')) {
                    animateNumber(target, 0, 50, 'CR', 2500);
                } else if (finalText.includes('24/7')) {
                    target.textContent = '24/7';
                }
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Phone Hologram Interactions
function initPhoneHologram() {
    const phone = document.querySelector('.phone-3d');
    const battleBtn = document.querySelector('.join-battle-btn');
    
    if (phone) {
        phone.addEventListener('mouseenter', () => {
            phone.style.animationPlayState = 'paused';
            phone.style.transform = 'rotateY(0deg) scale(1.1)';
        });
        
        phone.addEventListener('mouseleave', () => {
            phone.style.animationPlayState = 'running';
            phone.style.transform = '';
        });
    }
    
    if (battleBtn) {
        battleBtn.addEventListener('click', () => {
            battleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> JOINING...';
            battleBtn.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
            
            setTimeout(() => {
                battleBtn.innerHTML = '<i class="fas fa-check"></i> JOINED!';
                
                setTimeout(() => {
                    battleBtn.innerHTML = '<span>JOIN NOW</span>';
                    battleBtn.style.background = '';
                }, 2000);
            }, 2000);
        });
    }
}

// Floating Rewards Animation
function initFloatingRewards() {
    const rewards = document.querySelectorAll('.reward-popup');
    
    rewards.forEach((reward, index) => {
        setInterval(() => {
            reward.style.animationDelay = '0s';
            reward.style.animation = 'none';
            
            setTimeout(() => {
                reward.style.animation = 'reward-float 4s ease-in-out infinite';
            }, 100);
        }, 6000 + (index * 2000));
    });
}

// 3D Tournament Cards
function init3DTournamentCards() {
    const cards = document.querySelectorAll('.tournament-card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) rotateX(10deg) rotateY(5deg)';
            card.style.boxShadow = '0 30px 80px rgba(255, 0, 128, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '';
        });
        
        // Card flip effect
        card.addEventListener('click', () => {
            const container = card.querySelector('.card-3d-container');
            if (container) {
                container.style.transform = container.style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
            }
        });
    });
}

// Battle Progress Animation
function animateBattleProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-out';
                    bar.style.width = width;
                }, 500);
                
                observer.unobserve(bar);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Live Battle Updates
function initLiveBattleUpdates() {
    const playerCounts = document.querySelectorAll('.players-count span');
    
    setInterval(() => {
        playerCounts.forEach(count => {
            if (count.textContent.includes('/')) {
                const [current, max] = count.textContent.split(' / ').map(n => parseInt(n.replace(',', '')));
                if (current < max) {
                    const newCount = Math.min(max, current + Math.floor(Math.random() * 50));
                    count.textContent = newCount.toLocaleString() + ' / ' + max.toLocaleString();
                }
            }
        });
    }, 5000);
}

// Scroll Portal Effect
function initScrollPortal() {
    const portal = document.querySelector('.scroll-portal');
    
    if (portal) {
        portal.addEventListener('click', () => {
            document.querySelector('#arena').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Download Button Effects
function initDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn-3d');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const platform = btn.classList.contains('android') ? 'Android' : 'iOS';
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = `
                <div class=\"btn-hologram\">
                    <div class=\"btn-icon\">
                        <i class=\"fas fa-spinner fa-spin\"></i>
                    </div>
                    <div class=\"btn-info\">
                        <span class=\"btn-label\">Preparing</span>
                        <span class=\"btn-platform\">${platform} Download</span>
                    </div>
                </div>
            `;
            
            btn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                btn.innerHTML = `
                    <div class=\"btn-hologram\">
                        <div class=\"btn-icon\">
                            <i class=\"fas fa-check\"></i>
                        </div>
                        <div class=\"btn-info\">
                            <span class=\"btn-label\">Ready to Install</span>
                            <span class=\"btn-platform\">${platform} App</span>
                        </div>
                    </div>
                `;
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 3000);
        });
    });
}

// Parallax 3D Effect
function init3DParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Move floating islands
        const islands = document.querySelectorAll('.island');
        islands.forEach((island, index) => {
            const speed = 0.3 + (index * 0.1);
            island.style.transform = `translateY(${scrolled * speed}px) rotateZ(${scrolled * 0.01}deg)`;
        });
        
        // Move energy portals
        const portals = document.querySelectorAll('.portal');
        portals.forEach((portal, index) => {
            const speed = 0.2 + (index * 0.15);
            portal.style.transform = `translateY(${scrolled * speed}px) rotateZ(${scrolled * 0.02}deg)`;
        });
        
        // Move battlefield
        const battlefield = document.querySelector('.battlefield-3d');
        if (battlefield) {\n            battlefield.style.transform = `perspective(1000px) rotateX(60deg) translateZ(${scrolled * 0.1}px)`;
        }
    });
}

// Glitch Text Effect
function initGlitchText() {
    const glitchElements = document.querySelectorAll('.title-word');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() < 0.1) {
                element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                
                setTimeout(() => {
                    element.style.transform = 'translate(0, 0)';
                    element.style.filter = 'hue-rotate(0deg)';
                }, 100);
            }
        }, 2000);
    });
}

// Audio Effects (Visual representation)
function initAudioVisualEffects() {
    const audioElements = document.querySelectorAll('.battle-card-3d, .mega-btn');
    
    audioElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            createSoundWave(element);
        });
    });
}

function createSoundWave(element) {
    const wave = document.createElement('div');
    wave.style.position = 'absolute';
    wave.style.top = '50%';
    wave.style.left = '50%';
    wave.style.width = '10px';
    wave.style.height = '10px';
    wave.style.border = '2px solid #00ffff';
    wave.style.borderRadius = '50%';
    wave.style.transform = 'translate(-50%, -50%)';
    wave.style.animation = 'sound-wave 1s ease-out forwards';
    wave.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
    }, 1000);
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Enter':
                if (e.target.classList.contains('join-battle-btn')) {
                    e.target.click();
                }
                break;
            case 'Escape':
                // Reset all animations
                document.querySelectorAll('.card-3d-container').forEach(card => {
                    card.style.transform = 'rotateY(0deg)';
                });
                break;
            case ' ':
                e.preventDefault();
                document.querySelector('#arena').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
}

// Performance Monitor
function initPerformanceMonitor() {
    let fps = 0;
    let lastTime = performance.now();
    
    function calculateFPS() {
        const currentTime = performance.now();
        fps = 1000 / (currentTime - lastTime);
        lastTime = currentTime;
        
        // Reduce effects if FPS is too low
        if (fps < 30) {
            document.body.classList.add('low-performance');
        } else {
            document.body.classList.remove('low-performance');
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    calculateFPS();
}

// Add CSS animations
const additionalStyles = `
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes particle-3d {
        0% { transform: translateY(100vh) rotateZ(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotateZ(360deg); opacity: 0; }
    }
    
    @keyframes particle-burst {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(3) rotate(180deg); opacity: 0; }
    }
    
    @keyframes explosion-burst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
    }
    
    @keyframes sound-wave {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(10); opacity: 0; }
    }
    
    .low-performance * {
        animation-duration: 0.1s !important;
    }
    
    .card-3d-container {
        transition: transform 0.6s ease;
        transform-style: preserve-3d;
    }
    
    .card-face {
        backface-visibility: hidden;
    }
    
    .card-face.back {
        transform: rotateY(180deg);
    }
`;

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize all effects
    setTimeout(() => {
        createMatrixRain();
        create3DParticles();
        initExplosionLoader();
        init3DNavigation();
        initHolographicButtons();
        animate3DCounters();
        initPhoneHologram();
        initFloatingRewards();
        init3DTournamentCards();
        animateBattleProgress();
        initLiveBattleUpdates();
        initScrollPortal();
        initDownloadButtons();
        init3DParallax();
        initGlitchText();
        initAudioVisualEffects();
        initKeyboardShortcuts();
        initPerformanceMonitor();
    }, 1000);
});

// Console Art
console.log(`
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
🎮        GAME BAZZI - 3D ARENA        🎮
🔥     ULTIMATE FREE FIRE PLATFORM     🔥
💰      EARN LAKHS PLAYING GAMES!      💰
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

🚀 3D Website Loaded Successfully! 🚀
⚡ All Systems Online! ⚡
🎯 Ready for Epic Battles! 🎯
`);