<script lang="ts">
	import { Card, Timeline, NavItem } from '$lib/components';
</script>

<section id="about" class="flex min-h-screen w-full grow items-center px-8 py-8 sm:px-12">
	<div class="flex h-full w-full flex-col space-y-8">
		<div class="flex max-w-xl flex-row items-center space-x-4">
			<h2 class="whitespace-nowrap text-3xl font-bold text-white">About Me</h2>
			<div class="h-0.5 w-full bg-white"></div>
		</div>
		<div
			class="flex h-full w-full grow flex-col justify-between space-x-12 space-y-8 xl:flex-row xl:space-y-0">
			<Card class="flex w-full grow flex-col space-y-4 p-8 text-sm md:text-base ">
				<p>
					I've been coding in one way or another for over 13 years — from tinkering with Myspace
					HTML templates and small school projects to building internal tooling for fast-growing
					companies. For the past 7 years, I've worked as a professional Front-End Developer pushing
					code for startups, large-scale platforms, and entrepreneurs with exciting ideas.
					<br />
					<br />

					Beyond shipping features or spinning up new applications from scratch, I've contributed to
					shared libraries, CI/CD pipelines, and developer documentation, and supported hiring
					processes through reviewing code tests, conducting interviews, and onboarding new
					developers.

					<br />
					<br />
					What keeps me motivated is the creative side of development. I have a passion for exploring
					new tools, experimenting with different approaches, and finding better and cooler ways to solve
					problems and improve the user experience.
				</p>
				<div class="flex flex-row items-center space-x-4">
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
				</div>
			</Card>
			<Card class="grow p-8 xl:max-w-md 2xl:max-w-2xl">
				<div class="pl-6 pt-6">
					<Timeline></Timeline>
				</div>
			</Card>
		</div>
	</div>
</section>
