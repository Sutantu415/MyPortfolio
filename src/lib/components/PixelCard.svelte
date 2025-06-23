<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let variant = 'default';
  export let gap: number | undefined = undefined;
  export let speed: number | undefined = undefined;
  export let colors: string | undefined = undefined;
  export let noFocus = false;
  export let className = '';

  let containerRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;
  let pixels: Pixel[] = [];
  let animationId: number;
  let timePrevious = performance.now();
  let isHovered = false;

  const VARIANTS = {
    default: {
      activeColor: null,
      gap: 5,
      speed: 35,
      colors: "#f8fafc,#f1f5f9,#cbd5e1",
      noFocus: false
    },
    blue: {
      activeColor: "#e0f2fe",
      gap: 8,
      speed: 25,
      colors: "#e0f2fe,#7dd3fc,#0ea5e9",
      noFocus: false
    },
    green: {
      activeColor: "#dcfce7",
      gap: 6,
      speed: 30,
      colors: "#dcfce7,#86efac,#16a34a",
      noFocus: false
    },
    orange: {
      activeColor: "#fed7aa",
      gap: 7,
      speed: 35,
      colors: "#fed7aa,#fdba74,#ea580c",
      noFocus: false
    }
  };

  class Pixel {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    color: string;
    speed: number;
    size: number;
    sizeStep: number;
    minSize: number;
    maxSizeInteger: number;
    maxSize: number;
    delay: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isActive: boolean;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = context;
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = this.getRandomValue(0.1, 0.9) * speed;
      this.size = 0;
      this.sizeStep = Math.random() * 0.4 + 0.2;
      this.minSize = 0.5;
      this.maxSizeInteger = 2;
      this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
      this.delay = delay;
      this.counter = 0;
      this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
      this.isIdle = true;
      this.isActive = false;
    }

    getRandomValue(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    draw(): void {
      const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(
        this.x + centerOffset,
        this.y + centerOffset,
        this.size,
        this.size
      );
    }

    burst(): void {
      if (!this.isActive) return;
      
      this.isIdle = false;
      
      // Use delay for center-outward burst effect
      if (this.counter <= this.delay) {
        this.counter += this.counterStep;
        return;
      }
      
      // Start at max size for instant burst appearance
      if (this.size === 0) {
        this.size = this.maxSize;
      }
      
      // Fade out
      if (this.size <= 0) {
        this.isIdle = true;
        this.isActive = false;
        this.counter = 0;
        return;
      } else {
        this.size -= this.sizeStep;
      }
      
      this.draw();
    }

    reset(): void {
      this.size = 0;
      this.counter = 0;
      this.isIdle = true;
      this.isActive = false;
    }

    activate(): void {
      this.isActive = true;
      this.counter = 0;
    }
  }

  function getEffectiveSpeed(value: number, reducedMotion: boolean): number {
    const min = 0;
    const max = 100;
    const throttle = 0.001;

    if (value <= min || reducedMotion) {
      return min;
    } else if (value >= max) {
      return max * throttle;
    } else {
      return value * throttle;
    }
  }

  const variantCfg = VARIANTS[variant] || VARIANTS.default;
  $: finalGap = gap ?? variantCfg.gap;
  $: finalSpeed = speed ?? variantCfg.speed;
  $: finalColors = colors ?? variantCfg.colors;
  $: finalNoFocus = noFocus ?? variantCfg.noFocus;

  const reducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  function initPixels() {
    if (!containerRef || !canvasRef) return;

    const rect = containerRef.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const ctx = canvasRef.getContext("2d");

    if (!ctx) return;

    canvasRef.width = width;
    canvasRef.height = height;
    canvasRef.style.width = `${width}px`;
    canvasRef.style.height = `${height}px`;

    const colorsArray = finalColors.split(",");
    const pxs: Pixel[] = [];
    
    for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {
      for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(
          new Pixel(
            canvasRef,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(finalSpeed, reducedMotion),
            delay
          )
        );
      }
    }
    pixels = pxs;
  }

  function doBurst() {
    animationId = requestAnimationFrame(() => doBurst());
    const timeNow = performance.now();
    const timePassed = timeNow - timePrevious;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePrevious = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef?.getContext("2d");
    if (!ctx || !canvasRef) return;

    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

    let allIdle = true;
    for (let i = 0; i < pixels.length; i++) {
      const pixel = pixels[i];
      pixel.burst();
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    
    if (allIdle) {
      cancelAnimationFrame(animationId);
    }
  }

  function startBurst() {
    // Activate all pixels and start animation
    pixels.forEach(pixel => {
      pixel.reset();
      pixel.activate();
    });
    
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(() => doBurst());
  }

  function onMouseEnter() {
    isHovered = true;
    startBurst();
  }

  function onMouseLeave() {
    isHovered = false;
    // Reset all pixels immediately
    pixels.forEach(pixel => {
      pixel.reset();
    });
    cancelAnimationFrame(animationId);
    
    // Clear canvas
    const ctx = canvasRef?.getContext("2d");
    if (ctx && canvasRef) {
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    }
  }

  onMount(() => {
    initPixels();
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
</script>

<div
  bind:this={containerRef}
  class="relative overflow-hidden transition-all duration-300 hover:scale-105 rounded-xl bg-transparent {className}"
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  role="button"
  tabindex={finalNoFocus ? -1 : 0}
>
  <canvas
    bind:this={canvasRef}
    class="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-xl"
  ></canvas>

  <slot />
</div>

