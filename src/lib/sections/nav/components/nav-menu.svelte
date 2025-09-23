<script lang="ts">
	import NavItem from './nav-item.svelte';
	import { onMount } from 'svelte';

	//Group of nav item components.
	interface Props {
		// Handler for menu item click
		onItemClick?: (event: MouseEvent) => unknown;
		// Classes for menu
		class?: string;
	}

	let { onItemClick = undefined, class: className = '' }: Props = $props();

	// The section of the page currently in view.
	let activeSection: string = $state('welcome');

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

<ul class={className}>
	<NavItem
		onclick={onItemClick}
		svg="book"
		text="About Me"
		href="#about"
		isActive={activeSection === 'about'}></NavItem>
	<NavItem
		onclick={onItemClick}
		svg="code-bracket"
		text="Tech Stack"
		href="#tech"
		isActive={activeSection === 'tech'}></NavItem>
	<NavItem
		onclick={onItemClick}
		svg="computer-desktop"
		text="Projects"
		href="#projects"
		isActive={activeSection === 'projects'}></NavItem>
	<NavItem
		onclick={onItemClick}
		svg="envelope"
		text="Contact Me"
		href="#contact"
		isActive={activeSection === 'contact'}></NavItem>
</ul>
