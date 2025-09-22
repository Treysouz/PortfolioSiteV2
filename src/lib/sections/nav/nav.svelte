<script lang="ts">
	import { onMount } from 'svelte';

	import MobileNav from './mobile/mobile-nav.svelte';
	import DesktopNav from './desktop/desktop-nav.svelte';

	//Navigation bar component.

	let activeSection = $state('welcome');

	onMount(() => {
		// Get all the sections.
		const sections = document.querySelectorAll('section[id]');

		// Define oberserver options.
		const observerOptions = {
			threshold: 0.5,
			rootMargin: '-20% 0px -20% 0px'
		};

		// Initiate observer.
		const observer = new IntersectionObserver((elements) => {
			elements.forEach((element) => {
				if (element.isIntersecting) {
					activeSection = element.target.id;
				}
			});
		}, observerOptions);

		// Observe each section to detect when they are in view.
		sections.forEach((section) => observer.observe(section));

		return () => {
			// Stop observering if component unmounts.
			sections.forEach((section) => observer.unobserve(section));
		};
	});
</script>

<DesktopNav></DesktopNav>
<MobileNav></MobileNav>
