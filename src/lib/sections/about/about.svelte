<script lang="ts">
	import { Card, Timeline, NavItem, Section } from '$lib/components';
</script>

<Section id="about" header="About Me">
	<div
		class="flex h-full w-full grow flex-col justify-between space-x-4 space-y-4 tracking-wide sm:space-x-8 sm:space-y-8 xl:flex-row xl:space-y-0">
		<Card
			class="flex w-full grow flex-col justify-between space-y-4 py-4 text-sm sm:py-8 md:text-base">
			<p class="px-4 sm:px-8">
				I've been coding in one way or another for over 13 years — from tinkering with Myspace HTML
				templates and small school projects to building internal tooling for fast-growing companies.
				For the past 7 years, I've worked as a professional Front-End Developer pushing code for
				startups, large-scale platforms, and entrepreneurs with exciting ideas.
				<br />
				<br />

				Beyond shipping features or spinning up new applications from scratch, I've contributed to
				shared libraries, CI/CD pipelines, and developer documentation, and supported hiring
				processes through reviewing code tests, conducting interviews, and onboarding new
				developers.

				<br />
				<br />
				What keeps me motivated is the creative side of development. I have a passion for exploring new
				tools, experimenting with different approaches, and finding better and cooler ways to solve problems
				and improve the user experience.
			</p>
			<div class="flex flex-row items-center space-x-4 px-4">
				<NavItem
					svg="linkedin"
					text="Linkedin"
					class="size-28 rounded-lg visited:text-gray-400"
					anchorProps={{
						href: 'https://www.linkedin.com/in/tremayne-souza-98862b1a5/',
						target: '_blank',
						rel: 'noopener'
					}}></NavItem>
				<NavItem
					svg="github"
					text="GitHub"
					class="size-28 rounded-lg"
					anchorProps={{
						href: 'https://github.com/Treysouz',
						target: '_blank',
						rel: 'noopener'
					}}></NavItem>
				<span>Contact</span>
				<span>Resume</span>
			</div>
		</Card>
		<Card class="grow p-4 sm:p-8 xl:max-w-md 2xl:max-w-2xl">
			<div class="pl-4 pt-4">
				<Timeline></Timeline>
			</div>
		</Card>
	</div>
</Section>
