<script lang="ts">
	import { Icon, IconWrapper } from '$lib/components';
	import type { TimelineEvent } from './timeline.types';

	/** Section to welcome users to the site introducing name and title of developer.*/

	/** Timeline of professional events*/
	const history: TimelineEvent[] = [
		{
			header: 'Syracuse University',
			subHeader: 'The College of Arts & Sciences | Bachelors of Arts - Applied Mathematics',
			endYear: 2017,
			description: [
				'Concentration - Probability, Statistics & Complex Analysis',
				'Minor - Computer Science'
			],
			icon: 'academic-cap'
		},
		{
			header: 'AdGreetz',
			subHeader: 'Front-End Developer',
			startYear: 2018,
			endYear: 2020,
			description:
				'Collaborated with executives and creative teams to develop responsive client-facingapplications and marketing tools using tech such as React, Node.js, jQuery, SASS, and Bootstrap.',
			icon: 'brief-case'
		},
		{
			header: 'Queensborough Community College',
			subHeader: 'QCC TechWorks | Software Development Program',
			endYear: 2020,
			icon: 'academic-cap'
		},
		{
			header: 'Fetch Rewards',
			subHeader: 'Senior Front-End Developer',
			startYear: 2020,
			endYear: 2025,
			description:
				'Built and enhanced web and mobile applications using React, Svelte, React Native, AWS, and other frameworks and tools.',
			icon: 'brief-case'
		}
	];
</script>

<div>
	{#each history as event (event.header)}
		<div class="relative border-l-2 border-white pb-8 pl-12 text-sm last:pb-0">
			<IconWrapper class="absolute -left-6 -top-3">
				<Icon svg={event.icon} class="text-primary size-8"></Icon>
			</IconWrapper>
			<h3 class="font-bold">{event.header}</h3>
			<h4 class="text-gray-200">{event.subHeader}</h4>
			<span class="text-emphasis"
				>{event.startYear ? `${event.startYear} - ` : ''} {event.endYear}</span>

			{#if typeof event.description === 'string'}
				<p class="text-xs tracking-widest">{event.description}</p>
			{:else if event.description}
				<ul class="list-disc pl-4 text-xs tracking-widest">
					{#each event.description as item, index (index)}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>
