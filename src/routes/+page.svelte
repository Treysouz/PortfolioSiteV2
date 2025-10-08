<script lang="ts">
	import Card from '$lib/components/card/card.svelte';
	import { WelcomeSection, AboutSection, TechStackSection, ProjectSection } from '$lib/sections';
</script>

<header class="h-full">
	<WelcomeSection></WelcomeSection>
</header>

<AboutSection></AboutSection>

<TechStackSection></TechStackSection>

<ProjectSection></ProjectSection>

<footer>
	<div class="flex w-full flex-row items-center justify-center">
		<Card class="w-full rounded-none p-4 text-center lg:w-auto lg:rounded-b-none lg:rounded-t-lg"
			><span class="text-xs sm:text-sm"
				>Copyright © 2025 Tremayne Souza — Front-End Developer
			</span>
			<span class="text-xs sm:text-sm">
				All other copyrighted materials are property of their respective copyright holders
			</span></Card>
	</div>
</footer>
