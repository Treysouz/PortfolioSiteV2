<script lang="ts">
	// Alert message component to render when something blows up

	import { Icon, CloseButton } from '$lib/components';
	import { removeErrorFromStore } from '$lib/stores/alert';

	interface Props {
		/** The text to render as the header of the alert*/
		header: string;
		/** Map key for alert */
		alertKey: string;
		/** The text to render as the sub content under the header*/
		message?: string;
	}

	let { header, alertKey, message = '' }: Props = $props();

	const handleClose = () => {
		removeErrorFromStore(alertKey);
	};
</script>

<div
	role="alert"
	class="md:w-2xl h-20 w-full overflow-hidden rounded-lg border-none bg-black/50 shadow-xl backdrop-blur-lg sm:h-28">
	<div class="flex h-full w-full flex-row space-x-4 pr-4">
		<div class="bg-error flex h-full w-24 shrink-0 items-center justify-center">
			<Icon class="size-12 text-white" svg="exclamation-circle"></Icon>
		</div>
		<p
			class="flex w-full flex-col space-y-2 overflow-auto py-4 text-sm tracking-tight text-white sm:text-base">
			<span class="font-bold">{header}</span>
			{#if message}
				<span>
					{message}
				</span>
			{/if}
		</p>
		<div class="flex items-center justify-center">
			<CloseButton onclick={handleClose}></CloseButton>
		</div>
	</div>
</div>
