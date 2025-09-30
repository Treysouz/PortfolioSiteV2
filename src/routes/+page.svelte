<script lang="ts">
	import { WelcomeSection, AboutSection, TechStackSection } from '$lib/sections';
	import { Card } from '$lib/components';
</script>

<WelcomeSection></WelcomeSection>

<AboutSection></AboutSection>

<TechStackSection></TechStackSection>

<section id="projects" class="z-10 flex h-full w-full grow items-center justify-center px-12 py-8">
	<div class="flex h-full w-full flex-col space-y-8">
		<Card class="w-min">
			<h2 class=" whitespace-nowrap text-3xl font-bold">Projects</h2>
		</Card>
		<Card class="grow"></Card>
	</div>
</section>

<section id="contact" class="z-10 flex h-full w-full grow items-center justify-center px-12 py-8">
	<div class="flex h-full w-full flex-col space-y-8">
		<Card class="w-min">
			<h2 class=" whitespace-nowrap text-3xl font-bold">Contact Me</h2>
		</Card>
		<Card class="grow"></Card>
	</div>
</section>
