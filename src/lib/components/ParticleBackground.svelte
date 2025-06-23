<script lang="ts">
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement | undefined;
    let ctx: CanvasRenderingContext2D | null;
    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0, radius: 120 };

    let backgroundColor = '#001D3D'; // dark background always
    let dotColor = '#72D0F4'; // light blue dots

    interface IParticle {
        x: number;
        y: number;
        size: number;
        baseX: number;
        baseY: number;
        density: number;
        speedX: number;
        speedY: number;
        color: string;
        alpha: number;
        draw(): void;
        update(): void;
    }

    class Particle implements IParticle {
        x: number;
        y: number;
        size: number;
        baseX: number;
        baseY: number;
        density: number;
        speedX: number;
        speedY: number;
        color: string;
        alpha: number;

        constructor (x: number, y: number) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.baseX = x;
            this.baseY = y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = 0;
            this.speedY = 0;
            this.color = dotColor;
            this.alpha = Math.random();
        }

        draw() {
            if (!ctx) return;
            ctx.fillStyle = this.colorWithAlpha();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        colorWithAlpha() {
            return `${this.color}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`;
        }

        update() {
            if (!mouse.x || !mouse.y) return;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
                this.speedX = directionX;
                this.speedY = directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            this.alpha += (Math.random() - 0.5) * 0.05;
            this.alpha = Math.max(0.4, Math.min(1, this.alpha));
        }
    }

    function handleMouseMove(event: MouseEvent) {
        mouse.x = event.x;
        mouse.y = event.y;
    }

    function handleResize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }

    function init() {
        if (!canvas) return;
        particles = [];
        let numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    function connectParticles() {
        if (!ctx || !canvas) return;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.strokeStyle = particles[a].colorWithAlpha();
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        if (!ctx || !canvas) return;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
        animate();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<canvas
    bind:this={canvas}
    class="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-300"
></canvas>
