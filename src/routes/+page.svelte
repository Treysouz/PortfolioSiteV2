<script lang="ts">
	import { Card, Greeting } from '$lib/components';
</script>

<!--This and the projects page should be the only pages that rerenders on page visit and isn't cached.-->
<section class="z-10 flex h-full w-full items-center justify-center">
	<Card>
		<h1 class="text-center text-3xl">
			<span class="whitespace-nowrap"><Greeting></Greeting></span> <br />
			<span class="whitespace-nowrap">My name is Tremayne Souza.</span>
			<br />
			<span class="whitespace-nowrap">I'm a NY-based Front-End Developer.</span>
			<br />
			<span class="whitespace-nowrap">Let's Talk Code.</span>
		</h1>
	</Card>
</section>
