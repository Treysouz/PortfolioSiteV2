<script lang="ts">
	import NavItem from './nav-item.svelte';
	import { page } from '$app/state';
	import type { NavItemConfig, NavVarient, NavItemOrientation } from '../../nav.types';

	/** Group of nav item components. */
	interface Props {
		/** Handler for menu item click */
		onItemClick?: (event: MouseEvent) => unknown;
		/** Classes for menu */
		class?: string;
		varient?: NavVarient;
	}

	let { onItemClick = undefined, class: className = '', varient = 'desktop' }: Props = $props();

	/** The section of the page currently in view. */
	let activeSection: string = $state('welcome');

	/** Whether to render the icon and text vertically or horizontally */
	let orientation: NavItemOrientation = $derived(varient === 'desktop' ? 'vertical' : 'horizontal');

	/** Details for each nav item for rendering */
	const linkConfigs: NavItemConfig[] = [
		{
			svg: 'home',
			text: 'Welcome',
			href: '/#welcome',
			sectionId: 'welcome'
		},
		{
			svg: 'user',
			text: 'About Me',
			href: '/#about',
			sectionId: 'about'
		},
		{
			svg: 'code-bracket',
			text: 'Tech Stack',
			href: '/#tech',
			sectionId: 'tech'
		},
		{
			svg: 'computer-desktop',
			text: 'Projects',
			href: '/#projects',
			sectionId: 'projects'
		},
		{
			svg: 'envelope',
			text: 'Contact Me',
			href: '/#contact',
			sectionId: 'contact'
		},
		{
			svg: 'cog',
			text: 'Settings',
			href: '/settings',
			sectionId: 'settings'
		}
	];

	/**
	 * Initiates an IntersectionObserver to track which sections are currently in view.
	 * @returns {observer: IntersectionObserver, pageSections: NodeListOf<Element>} An object containing the observer instance and the sections being observed
	 */
	const initiateObserver = (): {
		observer: IntersectionObserver;
		pageSections: NodeListOf<Element>;
	} => {
		// Query sections for the current page
		const pageSections = document.querySelectorAll('section[id]');

		// Options for observer
		const observerOptions = {
			threshold: 0.4,
			rootMargin: '-15% 0px -15% 0px'
		};

		// Setup observer for current sections.
		const observer = new IntersectionObserver((elements) => {
			elements.forEach((element) => {
				if (element.isIntersecting) {
					activeSection = element.target.id;
				}
			});
		}, observerOptions);

		// Observe each section to check when it is in view
		pageSections.forEach((section) => observer.observe(section));

		return { observer, pageSections };
	};

	/** When page route updates, initiate a new observer */
	$effect(() => {
		if (page.route.id) {
			const { observer, pageSections } = initiateObserver();

			// Stop observing old sections
			return () => {
				pageSections.forEach((section) => observer.unobserve(section));
			};
		}
	});
</script>

<ul class={className} role="menu">
	{#each linkConfigs as config (config.sectionId)}
		<NavItem
			onclick={onItemClick}
			svg={config.svg}
			text={config.text}
			href={config.href}
			isActive={activeSection === config.sectionId}
			{orientation}></NavItem>
	{/each}
</ul>
