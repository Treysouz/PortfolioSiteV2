<!-- Error state component to render when something blows up -->

<script lang="ts">
	import { Icon, IconWrapper, Card, SVGS } from '$lib/components';

	interface Props {
		/** Icon to render with error*/
		svg: keyof typeof SVGS;
		/** The text to render as the header of the error state*/
		header: string;
		/** The text to render as the sub content under the header*/
		message?: string;
	}

	let { svg, header, message = '' }: Props = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
	<Card class="flex items-center justify-center p-4 sm:p-8">
		<div class="flex flex-col items-center space-y-4 sm:space-y-8">
			<IconWrapper class="size-20">
				<Icon {svg} class="text-primary h-full w-full p-2"></Icon>
			</IconWrapper>
			<div class="flex flex-col items-center space-y-2 text-center">
				<span class="font-bold lg:text-xl 2xl:text-3xl">{header}</span>
				{#if message}
					<span class="lg:text-sm 2xl:text-lg">{message}</span>
				{/if}
			</div>
		</div>
	</Card>
</div>
