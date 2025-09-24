<script lang="ts">
	import NavMenu from './nav-menu.svelte';
	import NavLogo from './nav-logo.svelte';

	//Navigation bar component.
</script>

<nav
	data-testid="desktop-nav"
	class="animate-slide-right flex h-full flex-col items-center bg-black/15 pt-8 shadow-md backdrop-blur-lg">
	<div class="py-15">
		<NavLogo></NavLogo>
	</div>
	<NavMenu class="flex flex-col items-center space-y-8 px-8"></NavMenu>
</nav>
