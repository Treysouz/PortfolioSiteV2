<script lang="ts">
	import { Card, Greeting, Icon } from '$lib/components';
</script>

<section class="z-10 flex h-full w-full items-center justify-center p-4">
	<Card class="animate-slide-up max-w-5xl">
		<h1 class="whitespace-nowrap text-xl lg:text-3xl 2xl:text-5xl">
			<Greeting></Greeting><br /><br /> My name is
			<span class="text-emphasis font-bold">Tremayne</span>,
		</h1>
		<br />
		<br />
		<p class="lg:text-xl 2xl:text-3xl">
			A NY-based Front-End Developer turning ideas into responsive, accessible, and user-friendly
			web and mobile applications.<br /><br />
			<span class="flex items-center"
				>Let's talk code <Icon
					svg="smile"
					class="text-emphasis animate-bounce-in ml-4 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16"
				></Icon></span
			>
		</p>
	</Card>
</section>
