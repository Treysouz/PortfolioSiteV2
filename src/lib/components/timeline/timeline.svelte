<script lang="ts">
	import { Icon, IconWrapper } from '$lib/components';
	import { history } from './history';

	// Section to welcome users to the site introducing name and title of developer.
</script>

<div>
	{#each history as event (event.header)}
		<div class="relative border-l-2 border-white pb-12 pl-12 text-sm last:pb-0">
			<IconWrapper class="absolute -left-6 -top-3">
				<Icon svg={event.icon} class="text-primary size-8"></Icon>
			</IconWrapper>
			<h3 class="font-bold">{event.header}</h3>
			<h4 class="text-gray-200">{event.subHeader}</h4>
			<span class="text-emphasis"
				>{event.startYear ? `${event.startYear} - ` : ''} {event.endYear}</span>

			{#if typeof event.description === 'string'}
				<p class="text-xs tracking-widest">{event.description}</p>
			{:else if event.description}
				<ul class="list-disc pl-4 text-xs tracking-widest">
					{#each event.description as item}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>
