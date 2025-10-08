<script lang="ts">
	// Component representing a grouping of alerts

	import { Alert } from '$lib/components';
	import { alertStore } from '$lib/stores/alert';

	/** Array of errors from alertStore map*/
	let errors = $derived([...alertStore]);
</script>

{#if errors.length}
	<div
		data-testId="alert-center"
		class="z-100 md:max-h-180 fixed top-0 max-h-60 w-full rounded-b-lg rounded-t-none sm:top-4 sm:w-auto md:bottom-8 md:right-8 md:top-auto md:w-min md:rounded-lg">
		<div class="max-h-90 md:max-h-180 w-full space-y-4 overflow-auto">
			{#each errors as [key, error] (key)}
				<Alert alertKey={key} header={error.header} message={error.message}></Alert>
			{/each}
		</div>
	</div>
{/if}
