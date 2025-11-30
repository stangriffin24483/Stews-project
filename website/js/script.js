// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll behavior for buttons (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll-to-top on page load if hash exists
window.addEventListener('load', () => {
    if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// Interactive background: follow mouse (parallax-like)
(() => {
    const root = document.documentElement;
    let mouseX = 50, mouseY = 50;
    let raf = null;

    function onMove(e){
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        mouseX = x; mouseY = y;
        if(!raf) raf = requestAnimationFrame(updateVars);
    }

    function updateVars(){
        root.style.setProperty('--x', mouseX + '%');
        root.style.setProperty('--y', mouseY + '%');
        raf = null;
    }

    // touch support: use touchmove
    function onTouch(e){
        if(e.touches && e.touches[0]){
            onMove(e.touches[0]);
        }
    }

    window.addEventListener('mousemove', onMove, {passive:true});
    window.addEventListener('touchmove', onTouch, {passive:true});
})();

// Card tilt effect
(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const tiltX = (dy / rect.height) * -12; // rotateX
            const tiltY = (dx / rect.width) * 12; // rotateY
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
            card.style.transition = 'transform 0.05s linear';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.25s ease';
        });
        // subtle press effect
        card.addEventListener('mousedown', () => {
            card.style.transform += ' scale(0.995)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = '';
        });
    });
})();
