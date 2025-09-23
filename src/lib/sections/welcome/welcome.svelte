<script lang="ts">
	import { Card, Greeting, Icon } from '$lib/components';

	// Section to welcome users to the site introducing name and title of developer.
</script>

<section id="welcome" class="z-10 flex h-full w-full items-center justify-center p-4">
	<Card class="animate-slide-up lg:max-w-2xl 2xl:max-w-5xl">
		<h1 class="break-keep text-lg md:text-xl lg:text-3xl 2xl:text-5xl">
			<span class="whitespace-nowrap"><Greeting></Greeting></span><br /><br /> My name is
			<span class="text-gradient animate-gradient-move whitespace-nowrap font-bold"
				>Tremayne Souza</span
			>.
		</h1>
		<br />
		<p class="text-sm md:text-base lg:text-xl 2xl:text-3xl">
			I'm a <span class="text-gradient animate-gradient-move font-bold"
				>NY-based Front-End Developer</span>
			turning ideas into responsive, accessible, and user-friendly web and mobile applications.
		</p>
		<br />
		<p class="flex items-center text-sm md:text-base lg:text-xl 2xl:text-3xl">
			Let's talk code <Icon
				svg="smile"
				class="animate-bounce-in ml-2 size-6 text-white md:size-8 lg:size-10  2xl:size-12"></Icon
			>.
		</p>
	</Card>
</section>
