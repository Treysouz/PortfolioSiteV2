<script lang="ts">
	import { onMount } from 'svelte';
	import NavItem from './desktop-nav-item.svelte';
	import NavLogo from '../nav-logo.svelte';

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

<nav
	class="sm:animate-slide-up lg:animate-slide-right hidden h-min w-full bg-black/15 shadow-md backdrop-blur-lg sm:flex lg:relative lg:h-full lg:w-auto lg:space-x-0 lg:pl-0 lg:pt-8">
	<ul
		class="flex flex-grow items-center justify-around lg:flex-col lg:justify-start lg:space-y-8 lg:px-4 lg:py-8">
		<li class="py-8"><NavLogo></NavLogo></li>
		<NavItem svg="book" text="About Me" href="#about" isActive={activeSection === 'about'}
		></NavItem>
		<NavItem svg="code-bracket" text="Tech Stack" href="#tech" isActive={activeSection === 'tech'}
		></NavItem>
		<NavItem
			svg="computer-desktop"
			text="Projects"
			href="#projects"
			isActive={activeSection === 'projects'}></NavItem>
		<NavItem svg="envelope" text="Contact Me" href="#contact" isActive={activeSection === 'contact'}
		></NavItem>
	</ul>
</nav>
