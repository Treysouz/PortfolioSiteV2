<script lang="ts">
	import { Card, Greeting, Icon } from '$lib/components';

	let greetingCardText: HTMLElement;
</script>

<!--This and the projects page should be the only pages that rerenders on page visit and isn't cached.-->

<section class="z-10 flex h-full w-full items-center justify-center">
	<Card class="animate-slide-up">
		<h1 class="whitespace-nowrap lg:text-3xl 2xl:text-5xl" bind:this={greetingCardText}>
			<span class="text-emphasis whitespace-nowrap font-bold lg:text-5xl 2xl:text-7xl"
				><Greeting></Greeting></span
			>
			<br />
			<br />
			<span class="whitespace-nowrap"
				>My name is <span class="text-emphasis font-bold">Tremayne Souza</span>.</span
			>
			<br />
			<span class="whitespace-nowrap">I'm a NY-based Front-End Developer. </span>

			<br />
			<br />
			<span class="flex items-center whitespace-nowrap"
				>Let's talk code <Icon
					svg="smile"
					class="text-emphasis animate-bounce-in ml-4 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16"
				></Icon>.</span
			>
		</h1>
	</Card>
</section>
