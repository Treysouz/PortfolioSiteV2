<script lang="ts">
	import { Card, Greeting, Icon, SVGS } from '$lib/components';
	import { history } from './history';

	// Section to welcome users to the site introducing name and title of developer.
</script>

<div>
	{#each history as event}
		<div class="relative border-l-2 border-white pb-12 pl-12 text-sm">
			<div
				class="absolute -left-6 -top-3 flex size-12 items-center justify-center rounded-full bg-white">
				<Icon svg={event.icon} class="text-primary size-8"></Icon>
			</div>
			<h3 class="font-bold">{event.header}</h3>
			<h4 class="text-gray-200">{event.subHeader}</h4>
			<span class="text-emphasis"
				>{event.startYear ? `${event.startYear} - ` : ''} {event.endYear}</span>

			{#if typeof event.description === 'string'}
				<p>{event.description}</p>
			{:else if event.description}
				<ul class="list-disc pl-4">
					{#each event.description as item}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>
