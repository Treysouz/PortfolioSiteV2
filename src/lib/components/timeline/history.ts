import { SVGS } from '..';

interface Event {
	header: string;
	subHeader: string;
	endYear: number;
	icon: keyof typeof SVGS;
	startYear?: number;
	description?: string | string[];
}

export const history: Event[] = [
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
