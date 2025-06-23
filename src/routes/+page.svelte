<script>
    import ParticleBackground from "$lib/components/ParticleBackground.svelte";
    import Header from "$lib/components/Header.svelte";
    import ThemeToggle from "$lib/components/ThemeToggle.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Main from "$lib/components/Main.svelte";
</script>

<ParticleBackground />
<div class="container mx-auto max-w-4xl px-4 py-16">
    <Header />
    <Main />
    <Footer />
</div>
