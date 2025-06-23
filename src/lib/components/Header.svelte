<script>
    import { base } from '$app/paths';
    
    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/sutantu-balamurugan/',
            bgColor: 'bg-[#0A66C2]',
            hoverBg: 'hover:bg-[#0077B5]',
            icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>`,
        },
        {
            name: 'GitHub',
            url: 'https://github.com/Sutantu415',
            bgColor: 'bg-[#24292F]',
            hoverBg: 'hover:bg-[#2F3337]',
            icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>`,
        },
    ];
</script>
  
<header class="text-center mb-16 bg-white/90 dark:bg-[#001219]/[0.9] rounded-2xl p-8 shadow-lg transition-colors duration-300">
    <img src="{base}/pfp.jpeg" alt="Sutantu Balamurugan" class="w-40 h-40 rounded-full object-cover mx-auto mb-8 border-4 border-white shadow-xl">
    <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">Sutantu Balamurugan</h1>
    <p class="text-xl text-gray-800 dark:text-gray-200 mb-8 font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 inline-block px-4 py-2 rounded-full">
        Software Developer | UW Alumni
    </p>
    <div class="flex justify-center space-x-4">
        {#each socialLinks as link}
            <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 {link.bgColor} {link.hoverBg} text-white rounded-full 
                    transform hover:scale-110 transition-all duration-300 
                    shadow-lg hover:shadow-xl"
            aria-label={link.name}
            >
            {@html link.icon}
            </a>
        {/each}
    </div>
</header>



