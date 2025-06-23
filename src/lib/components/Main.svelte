<script>
  import { base } from '$app/paths';
  import ExperienceCards from './ExperienceCards.svelte';
  import ProjectCards from './ProjectCards.svelte';
  import SkillCards from './SkillCards.svelte';
</script>
  
<main class="bg-white dark:bg-[#001219]/[0.9] bg-opacity-80 rounded-2xl shadow-lg p-8 mb-16 transition-colors duration-300">
  <section class="mb-12">
    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">About Me</h2>
    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      I'm a recent Computer Science graduate from the University of Washington with a focus on full-stack development. 
      I've built a range of web apps to backend systems and APIs.
      I'm especially interested in learning more about AI and how emerging tools can be used to build smarter applications, and I'm looking to grow my skills in that space.
    </p>
  </section>

  <ExperienceCards />

  <ProjectCards />

  <SkillCards />

  <section class="mb-12">
    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">GitHub Activity</h2>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Contribution Graph</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Recent activity on my projects
          </p>
        </div>
        <a 
          href="https://github.com/Sutantu415" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View Profile
        </a>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <iframe 
          src="https://jandee.vercel.app/Sutantu415?scheme=dark&footer=false&radius=3&margin=2" 
          class="w-full h-32 border-0 rounded-lg transition-all duration-300"
          title="GitHub Contributions"
        ></iframe>
      </div>
    </div>
  </section>
</main>
  