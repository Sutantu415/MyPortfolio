<script lang="ts">
  import PixelCard from './PixelCard.svelte';
  
  const projects = [
    {
      title: 'SportsColumbus',
      description: "Manage teams, players, and matches for any sport — all in one place. Built to simplify multi-league coordination and scheduling.",
      tech: ['Next.js', 'JavaScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Node.js'],
      date: 'April 2025 - Present',
      bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600',
      link: 'https://sportscolumbus.org',
      pixelVariant: 'blue'
    },
    {
      title: 'StudySync',
      description: 'StudySync is a collaborative virtual study room application designed to enhance productivity and focus. The app features a dynamic video background, room creation and joining options, and user authentication powered by Firebase.',
      tech: ['React', 'JavaScript', 'Firebase', 'Tailwind CSS', 'Node.js'],
      date: 'October 2024 - December 2024',
      bgColor: 'bg-gradient-to-br from-green-500 to-teal-600',
      link: 'https://studysync-4a5fd.web.app/',
      pixelVariant: 'green'
    },
    {
      title: 'Red Apron',
      description: 'Developed a RESTful API and management system for Red Apron, a mock home-food delivery business, to streamline inventory tracking and order fulfillment for small businesses.',
      tech: ['JavaScript', 'PostgreSQL', 'Express.js', 'Node.js', 'AWS'],
      date: 'January 2024',
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-600',
      link: 'https://github.com/DylanT80/RedApron',
      pixelVariant: 'orange'
    }
  ];
</script>

<section class="mb-12">
  <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Projects</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each projects as project}
       <PixelCard variant={project.pixelVariant} className="w-full rounded-xl">
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          class="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-full h-full group cursor-pointer"
        >
          <div class="h-48 {project.bgColor} flex items-center justify-center p-6">
            <h3 class="text-2xl font-bold text-white text-center">{project.title}</h3>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">{project.date}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.tech as tech}
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {tech}
                </span>
              {/each}
            </div>
            <div class="inline-flex items-center text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
              View Project
              <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </a>
      </PixelCard>
    {/each}
  </div>
</section>
