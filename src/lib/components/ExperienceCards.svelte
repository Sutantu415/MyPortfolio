<script lang="ts">
    import { base } from '$app/paths';

    const experience = [
      {
        title: 'Software Engineer',
        company: 'One Global Info Systems',
        date: 'April 2025 - Present',
        avatar: `${base}/OneGlobalInfoSystems.jpg`,
        bullets: [
          'Operated as the sole autonomous developer in a 10-person startup delivering on requirements provided by the CEO',
          'Launched SportsColumbus, a multi-league sports management platform supporting match scheduling, team registration, and player approvals for cricket, soccer, and volleyball',
          'Drove full DevOps cycle including feature expansion, QA, deployment, and live monitoring for the MVP; logging 88+ unique visitors and 190+ page views since launch',
          'Full-stack development experience using React, Tailwind CSS, and Supabase/PostgreSQL; integrated API endpoints, managed user sessions, and deployed via Vercel, achieving a 90+ Experience Score',
        ],
        tech: ['React', 'Next.js', 'Node.js', 'Supabase', 'PostgreSQL', 'Tailwind']
      },
    ];
  </script>
  
  <section class="mb-12">
    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Experience</h2>
    <div class="flex flex-col gap-6">
      {#each experience as exp}
        <div class="bg-white/90 dark:bg-gray-800/[0.9] rounded-2xl shadow-lg overflow-hidden">
          <!-- Header Row -->
          <div class="flex items-center p-6 bg-[#001D3D]">
            <img src={exp.avatar} alt="Profile" class="w-20 h-20 rounded-full mr-4 border-2 border-white" />
            <div>
              <h3 class="text-xl font-bold text-white">{exp.title}</h3>
              <p class="text-white text-sm">{exp.company}</p>
              <p class="text-white text-xs">{exp.date}</p>
            </div>
          </div>
  
          <!-- Bullet Points -->
          <div class="p-6 text-gray-700 dark:text-gray-300">
            <ul class="list-disc list-inside space-y-2">
              {#each exp.bullets as bullet}
                <li>{bullet}</li>
              {/each}
            </ul>
  
            <!-- Tech Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              {#each exp.tech as tech}
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
  