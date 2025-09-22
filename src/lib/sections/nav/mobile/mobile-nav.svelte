<script lang="ts">
	import { onMount } from 'svelte';
	import MobileNavItem from './mobile-nav-item.svelte';
	import NavLogo from '../nav-logo.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import SVGS from '$lib/components/icon/svgs';

	//Navigation bar component.

	let activeSection: string = $state('welcome');
	let openMenu: boolean = $state(false);

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
	class="z-5 fixed top-0 flex h-min w-screen items-center justify-between bg-black/15 px-8 py-4 shadow-md backdrop-blur-lg sm:hidden">
	<NavLogo></NavLogo>
	<div class="relative">
		<button
			aria-expanded={openMenu}
			class="text-white"
			onclick={() => {
				openMenu = !openMenu;
			}}>
			<Icon svg="bars-3" class="size-10"></Icon>
		</button>
		<ul
			class:hidden={!openMenu}
			class="w-50 animate-fade-in absolute right-1 overflow-hidden rounded-lg bg-black">
			<MobileNavItem svg="book" text="About Me" href="#about" isActive={activeSection === 'about'}
			></MobileNavItem>
			<MobileNavItem
				svg="code-bracket"
				text="Tech Stack"
				href="#tech"
				isActive={activeSection === 'tech'}></MobileNavItem>
			<MobileNavItem
				svg="computer-desktop"
				text="Projects"
				href="#projects"
				isActive={activeSection === 'projects'}></MobileNavItem>
			<MobileNavItem
				svg="envelope"
				text="Contact Me"
				href="#contact"
				isActive={activeSection === 'contact'}></MobileNavItem>
		</ul>
	</div>
</nav>
