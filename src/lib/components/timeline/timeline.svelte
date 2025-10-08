<script lang="ts">
	import { Icon, IconWrapper } from '$lib/components';
	import type { TimelineEvent } from './timeline.types';

	/** Section to welcome users to the site introducing name and title of developer.*/

	/** Timeline of professional events*/
	const history: TimelineEvent[] = [
		{
			header: 'Fetch Rewards',
			subHeader: 'Senior Front-End Developer',
			startYear: 2020,
			endYear: 2025,
			description:
				'Built and enhanced web and mobile applications using React, Svelte, React Native, AWS, and other frameworks and tools.',
			icon: 'brief-case'
		},
		{
			header: 'Queensborough Community College',
			subHeader: 'QCC TechWorks | Software Development Program',
			endYear: 2020,
			icon: 'academic-cap'
		},
		{
			header: 'AdGreetz',
			subHeader: 'Front-End Developer',
			startYear: 2018,
			endYear: 2020,
			description:
				'Collaborated with executives and creative teams to develop responsive client-facing applications and marketing tools using tech such as React, Node.js, jQuery, SASS, and Bootstrap.',
			icon: 'brief-case'
		},
		{
			header: 'Syracuse University',
			subHeader: 'The College of Arts & Sciences | Bachelors of Arts - Applied Mathematics',
			endYear: 2017,
			description: [
				'Concentration - Probability, Statistics & Complex Analysis',
				'Minor - Computer Science'
			],
			icon: 'academic-cap'
		}
	];
</script>

<div>
	{#each history as event (event.header)}
		<div
			class="relative border-l-2 border-white pb-8 pl-12 text-xs tracking-normal last:pb-0 sm:text-sm">
			<IconWrapper class="absolute -left-4 -top-3 sm:-left-6">
				<Icon svg={event.icon} class="text-primary size-6 sm:size-8"></Icon>
			</IconWrapper>
			<h3 class="font-bold tracking-widest">{event.header}</h3>
			<h4>{event.subHeader}</h4>
			<span class="text-accent"
				>{event.startYear ? `${event.startYear} - ` : ''} {event.endYear}</span>

			{#if typeof event.description === 'string'}
				<p>{event.description}</p>
			{:else if event.description}
				<ul class="list-disc pl-4">
					{#each event.description as item, index (index)}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>
