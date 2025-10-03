<script lang="ts">
	import { Card, Icon } from '$lib/components';
	import type { Tech } from '$lib/types/tech.types';

	interface Props {
		/** Tech that the card represents*/
		tech: Tech;
	}

	let { tech }: Props = $props();

	let { name, imgUrl, proficiency } = $derived(tech);
</script>

<Card class="size-37 sm:size-45 flex items-center justify-center p-2 sm:p-4">
	<div class="flex flex-col items-center justify-around space-y-2 sm:space-y-4">
		<span class="text-center text-lg font-bold">{name}</span>
		<div class="flex flex-row" title="Proficiency">
			{#each Array(5) as _, index (index)}
				<Icon
					svg={index + 1 <= (proficiency || 0) ? 'star-filled' : 'star-outline'}
					class="text-accent size-4"></Icon>
			{/each}
		</div>
		<div>
			<img class="size-12 object-contain sm:size-16" loading="lazy" alt={name} src={imgUrl} />
		</div>
	</div>
</Card>
