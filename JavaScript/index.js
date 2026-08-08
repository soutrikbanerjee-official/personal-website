const canvas = document.getElementById('networkcanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mysticalOrbs = [];

const particleCount = 85;
const orbCount = 8;
const maxDistance = 145;

let mouse = {
    x: null,
    y: null,
    radius: 150
};

function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement.clientHeight || 350;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

if (canvas && canvas.parentElement) {
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
}

class MysticalOrb {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 25 + 15;
        
        const colors = [
            'rgba(163, 163, 163, ',
            'rgba(212, 212, 212, ',
            'rgba(115, 115, 115, '
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.08 + 0.03; 
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -30) this.x = canvas.width + 30;
        if (this.x > canvas.width + 30) this.x = -30;
        if (this.y < -30) this.y = canvas.height + 30;
        if (this.y > canvas.height + 30) this.y = -30;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colorBase + this.alpha + ')';
        ctx.shadowColor = this.colorBase + '0.3)';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.1;
        this.vy = (Math.random() - 0.5) * 1.1;
        this.radius = 2.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= (dx / distance) * force * 3.5;
                this.y -= (dy / distance) * force * 3.5;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function init() {
    particles = [];
    mysticalOrbs = [];

    for (let i = 0; i < orbCount; i++) {
        mysticalOrbs.push(new MysticalOrb());
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

if (!window.matchMedia('(orientation: portrait)').matches) {
    init();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mysticalOrbs.forEach(orb => {
        orb.update();
        orb.draw();
    });

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                let alpha = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(225, 225, 225, ${alpha * 0.35})`;
                ctx.lineWidth = 0.9;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

if (!window.matchMedia('(orientation: portrait)').matches) {
    animate();
}