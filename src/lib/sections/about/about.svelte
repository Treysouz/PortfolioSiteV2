<script lang="ts">
	import { Card, Timeline } from '$lib/components';
</script>

<section id="about" class="z-10 flex min-h-screen w-full grow px-12 py-16">
	<div class="flex h-full w-full flex-col space-y-8">
		<div class="flex max-w-xl flex-row items-center space-x-4">
			<h2 class="whitespace-nowrap text-3xl font-bold text-white">About Me</h2>
			<div class="h-0.5 w-full bg-white"></div>
		</div>
		<div class="flex grow flex-row justify-between space-x-8">
			<Card class="max-w-xl grow text-sm md:text-base lg:text-lg">
				<p>
					I’ve been coding in one way or another for over 13 years — from tinkering with Myspace
					HTML templates and small school projects to building internal tooling for fast-growing
					companies. For the past 7 years, I’ve worked as a professional Front-End Developer pushing
					code for startups, large-scale platforms, and entrepreneurs with exciting ideas.
					<br />
					<br />

					Beyond shipping features or spinning up new applications from scratch, I’ve contributed to
					shared libraries, CI/CD pipelines, and developer documentation, and supported hiring
					processes through reviewing code tests, conducting interviews, and onboarding new
					developers.

					<br />
					<br />
					What keeps me motivated is the creative side of development. I have a passion for exploring
					new tools, experimenting with different approaches, and finding better and cooler ways to solve
					problems and improve the user experience.
				</p>
			</Card>
			<Card class="grow">
				<div class="max-w-2xl pl-6 pt-6">
					<Timeline></Timeline>
				</div>
			</Card>
		</div>
	</div>
</section>
