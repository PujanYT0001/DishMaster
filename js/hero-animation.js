const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let shards = [];
let particles = [];
const shardCount = 15;
const particleCount = 100;

const mouse = {
    x: undefined,
    y: undefined,
    targetX: undefined,
    targetY: undefined
};

window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Shard {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 80 + 40;
        this.points = [];
        const sides = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < sides; i++) {
            this.points.push({
                x: Math.cos((i / sides) * Math.PI * 2) * this.size,
                y: Math.sin((i / sides) * Math.PI * 2) * this.size
            });
        }
        this.angle = Math.random() * Math.PI * 2;
        this.angularVelocity = (Math.random() - 0.5) * 0.01;
        this.velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
        };
        this.parallaxFactor = Math.random() * 0.05 + 0.02;
    }

    draw() {
        ctx.save();
        
        // Mouse parallax
        const offsetX = (mouse.x - width / 2) * this.parallaxFactor;
        const offsetY = (mouse.y - height / 2) * this.parallaxFactor;
        
        ctx.translate(this.x + offsetX, this.y + offsetY);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();
        
        // Gradient for glass effect
        const grad = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
        grad.addColorStop(0, 'rgba(255, 106, 0, 0.1)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        grad.addColorStop(1, 'rgba(255, 106, 0, 0.1)');
        
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 106, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.angle += this.angularVelocity;

        if (this.x < -this.size * 2) this.x = width + this.size * 2;
        if (this.x > width + this.size * 2) this.x = -this.size * 2;
        if (this.y < -this.size * 2) this.y = height + this.size * 2;
        if (this.y > height + this.size * 2) this.y = -this.size * 2;
    }
}

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.velocity = {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1
        };
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 106, 0, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
}

function init() {
    for (let i = 0; i < shardCount; i++) {
        shards.push(new Shard());
    }
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    mouse.x = width / 2;
    mouse.y = height / 2;
    mouse.targetX = width / 2;
    mouse.targetY = height / 2;
}

function animate() {
    // Smooth mouse movement
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    shards.forEach(s => {
        s.update();
        s.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();
