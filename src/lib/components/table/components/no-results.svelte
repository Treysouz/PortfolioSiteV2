<script lang="ts">
	import { Icon, IconWrapper, Card } from '$lib/components';

	interface Props {
		/** Whether this component is rendering in the context of a table error*/
		isError?: boolean;
	}

	let { isError = false }: Props = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
	<Card class="flex items-center justify-center p-4 sm:p-8">
		<div class="flex flex-col items-center space-y-4 sm:space-y-8">
			<IconWrapper class="size-20">
				<Icon svg={isError ? 'grimmace' : 'frown'} class="text-primary h-full w-full"></Icon>
			</IconWrapper>
			<div class="flex flex-col items-center space-y-2 text-center">
				{#if isError}
					<span class="font-bold lg:text-xl 2xl:text-3xl">Something went wrong</span>
					<span class="lg:text-sm 2xl:text-lg">Please try again later</span>
				{:else}
					<span class="font-bold lg:text-xl 2xl:text-3xl">No results found</span>
					<span class="lg:text-sm 2xl:text-lg"
						>Please check your input and filters and try again</span>
				{/if}
			</div>
		</div>
	</Card>
</div>
