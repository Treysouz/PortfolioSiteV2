<script lang="ts">
	import NavMenu from '../nav-menu/nav-menu.svelte';
	import { Card } from '$lib/components';

	/** Navigation bar component. */
</script>

<nav data-testid="desktop-nav" class="animate-slide-up lg:animate-slide-right w-full lg:w-min">
	<Card class="flex overflow-hidden rounded-none lg:rounded-r-lg">
		<NavMenu class="flex w-full items-center justify-around lg:w-min  lg:flex-col lg:justify-center"
		></NavMenu>
	</Card>
</nav>
