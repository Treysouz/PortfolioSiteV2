<script lang="ts">
	/** Tech card component to render inside the tech table*/

	import { Card, Icon } from '$lib/components';
	import type { Tech } from '$lib/types/tech.types';

	interface Props {
		/** Tech that the card represents*/
		tech: Tech;
	}

	let { tech }: Props = $props();

	let { name, imgUrl, proficiency, type } = $derived(tech);
</script>

<Card class="flex size-40 items-center justify-center p-2 sm:size-52 sm:p-4">
	<div class="flex flex-col items-center justify-around space-y-2 sm:space-y-4">
		<img class="size-12 object-contain sm:size-16" loading="lazy" alt={name} src={imgUrl} />

		<span class="leading-2 text-center text-lg font-bold">{name}</span>
		<div class="flex flex-row" title="Proficiency">
			{#each Array(5) as _, index (index)}
				<Icon
					svg={index + 1 <= (proficiency || 0) ? 'star-filled' : 'star-outline'}
					class="text-accent size-4"></Icon>
			{/each}
		</div>
		<span
			class="badge badge-outline h-full py-1 text-center text-xs font-bold tracking-tighter sm:text-nowrap"
			>{type}</span>
	</div>
</Card>
