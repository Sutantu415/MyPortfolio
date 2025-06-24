<script lang="ts">
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit'
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		injectAnalytics();
		injectSpeedInsights();
	});
</script>

{@render children()}
