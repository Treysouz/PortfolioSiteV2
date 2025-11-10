<!--Group of nav item components -->

<script lang="ts">
	import NavItem from './nav-item.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import type { NavItemConfig } from '../nav.types';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Classes for menu */
		class?: string;
		/** Additional items to render in nav menu*/
		additional?: Snippet;
	}

	let { class: className = '', additional = undefined }: Props = $props();

	/** The section of the page currently in view. */
	let activeSection: string = $state('');

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
			text: 'Tech',
			href: '/#tech',
			sectionId: 'tech'
		},
		{
			svg: 'computer-desktop',
			text: 'Projects',
			href: '/#projects',
			sectionId: 'projects'
		}
		// {
		// 	svg: 'cog',
		// 	text: 'Settings',
		// 	href: '/settings',
		// 	sectionId: 'settings'
		// }
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
			threshold: 0.2,
			rootMargin: '-15% 0px -15% 0px'
		};

		// Setup observer for current sections.
		const observer = new IntersectionObserver((elements) => {
			elements.forEach((element) => {
				if (element.isIntersecting) {
					// Update actionSection with section in view
					activeSection = element.target.id;
				}
			});
		}, observerOptions);

		// Observe each section to check when it is in view
		pageSections.forEach((section) => observer.observe(section));

		return { observer, pageSections };
	};

	/** On mount, make sure we scroll to the hash in the url before initiating any observers*/
	onMount(() => {
		activeSection = window.location.hash ? window.location.hash.slice(1) : '';
		if (window?.location.hash) {
			const targetId = window.location.hash.slice(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				targetElement.scrollIntoView();
			}
		}
	});

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

<ul class="sm:overflow-auto {className}" role="menu">
	{#each linkConfigs as config (config.sectionId)}
		<li role="menuitem" class="w-full">
			<NavItem
				class="lg:size-30 w-full p-2 text-sm sm:p-4 md:text-lg"
				svg={config.svg}
				text={config.text}
				anchorProps={{ href: config.href }}
				isActive={activeSection === config.sectionId}></NavItem>
		</li>
	{/each}
	{@render additional?.()}
</ul>
