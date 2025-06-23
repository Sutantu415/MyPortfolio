<script lang="ts">
    import { base } from '$app/paths';
  
    export let color = '#5227FF';
    export let size = 1;
    export let className = '';
  
    let open = false;
    let paperOffsets = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
  
    function darkenColor(hex: string, percent: number): string {
      let color = hex.startsWith('#') ? hex.slice(1) : hex;
      if (color.length === 3) {
        color = color
          .split('')
          .map((c) => c + c)
          .join('');
      }
      const num = parseInt(color, 16);
      let r = (num >> 16) & 0xff;
      let g = (num >> 8) & 0xff;
      let b = num & 0xff;
      r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
      g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
      b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
      return (
        '#' +
        ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
      );
    }
  
    $: folderBackColor = darkenColor(color, 0.08);
    $: paper1 = darkenColor('#ffffff', 0.1);
    $: paper2 = darkenColor('#ffffff', 0.05);
    $: paper3 = '#ffffff';
  
    function handleClick() {
      open = !open;
      if (open) {
        paperOffsets = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
      }
    }
  
    function handlePaperMouseMove(e: MouseEvent, index: number) {
      if (!open) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) * 0.15;
      const offsetY = (e.clientY - centerY) * 0.15;
      paperOffsets[index] = { x: offsetX, y: offsetY };
    }
  
    function handlePaperMouseLeave(index: number) {
      paperOffsets[index] = { x: 0, y: 0 };
    }
  
    function getOpenTransform(index: number): string {
      if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
      if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
      if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
      return '';
    }
  
    function downloadResume() {
      const link = document.createElement('a');
      link.href = `${base}/Resume.pdf`;
      link.download = 'Sutantu_Balamurugan_Resume.pdf';
      link.click();
    }
  </script>
  
  <div style="transform: scale({size})" class={className}>
    <div
      class="group relative transition-all duration-200 ease-in cursor-pointer {!open ? 'hover:-translate-y-2' : ''}"
      style="--folder-color: {color}; --folder-back-color: {folderBackColor}; --paper-1: {paper1}; --paper-2: {paper2}; --paper-3: {paper3}; transform: {open ? 'translateY(-8px)' : 'none'}"
      on:click={handleClick}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div
        class="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
        style="background-color: {folderBackColor}"
      >
        <span
          class="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
          style="background-color: {folderBackColor}"
        ></span>
        
        {#each [0, 1, 2] as i}
          {@const sizeClasses = i === 0 ? (open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]') : 
                                i === 1 ? (open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]') : 
                                          (open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]')}
          {@const transformStyle = open ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)` : undefined}
          {@const bgColor = i === 0 ? paper1 : i === 1 ? paper2 : paper3}
          
          <div
            class="absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out {!open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'} {sizeClasses}"
            style="transform: {!open ? undefined : transformStyle}; background-color: {bgColor}; border-radius: 10px"
            on:mousemove={(e) => handlePaperMouseMove(e, i)}
            on:mouseleave={() => handlePaperMouseLeave(i)}
            role="button"
            tabindex="0"
          >
            {#if i === 2 && open}
              <button
                on:click|stopPropagation={downloadResume}
                class="w-full h-full flex items-center justify-center text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Resume
              </button>
            {/if}
          </div>
        {/each}
        
        <div
          class="absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out {!open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''}"
          style="background-color: {color}; border-radius: 5px 10px 10px 10px; {open ? 'transform: skew(15deg) scaleY(0.6)' : ''}"
        ></div>
        <div
          class="absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out {!open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''}"
          style="background-color: {color}; border-radius: 5px 10px 10px 10px; {open ? 'transform: skew(-15deg) scaleY(0.6)' : ''}"
        ></div>
      </div>
    </div>
  </div>