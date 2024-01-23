<script lang="ts">
	import { browser } from '$app/environment';
	import type { Topper, Department, Year } from '$lib/types/types';
	import Save from '$lib/components/Save.svelte';
	import Github from '$lib/assets/socials/Github.svg';
	import Logo from '$lib/assets/assorted/logo.svg';
	export let username: string;
	export let department: Department;
	export let year: Year;
	async function fetchTopper() {
		const topper: Topper = await fetch(`/api/getTopper?topper=${username}`).then((response) =>
			response.json()
		);
		return topper;
	}
</script>

<article id="topper">
	<header class="header-title">
		<div class="title-logo">
			{#if browser && matchMedia('(min-width : 768px)').matches}
				<img src={Logo} alt="logo" />
			{/if}
			<hgroup>
				<h2>BuzzLeague Champion</h2>
				<p>By Ranking</p>
			</hgroup>
		</div>
		<Save />
	</header>
	<main>
		{#await fetchTopper()}
			<div aria-busy="true"></div>
		{:then data}
			<div class="avatar-container">
				<img class="user-avatar" src={data.userAvatar} alt="user avatar" />
			</div>
			<div>
				<hgroup>
					<div class="user-title">
						<a href={`https://leetcode.com/${data.username}`}><h3>{data.username}</h3></a>
						<a data-sveltekit-reload href={data.github}
							><img class="github" src={Github} alt="github-icon" /></a
						>
					</div>
					<p>{data.aboutMe}</p>
				</hgroup>
				<hr />
				<p><strong>{year + ' year'} {department == 'SH' ? 'S&H' : department}</strong></p>
				<p><strong>Ranking: </strong> {data.ranking}</p>
				<p><strong>Skills:</strong> {data.skillTags.join(', ')}</p>
				<p><strong>Total Solved: </strong> {data.totalSolved}</p>
				<p>
					<strong>Recent Submission: </strong>
					{data.recentSubmission} ({data.recentSubmissionStatus})
				</p>
			</div>
		{/await}
	</main>
</article>

<style>
	.user-avatar {
		height: 12rem;
		width: auto;
		border-radius: 50%;
	}
	@media (max-width: 1023px) {
		.user-avatar {
			height: 9rem;
			width: auto;
		}
		.avatar-container {
			margin-bottom: 2rem;
		}
	}
	.github {
		height: 2rem;
		width: 2rem;
	}
	.user-title {
		display: flex;
		align-items: start;
		gap: 1rem;
	}
	.header-title {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: space-between;
	}
	.title-logo {
		display: flex;
		gap: 1rem;
	}
	@media (min-width: 768px) {
		main {
			display: grid;
			grid-template-columns: 40% 60%;
		}
	}
	@media (max-width: 767px) {
		main {
			display: grid;
			grid-template-rows: 35% 65%;
		}
	}
	.avatar-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	header img {
		height: 4rem;
		width: auto;
	}
	article {
		height: min-content;
	}
</style>
