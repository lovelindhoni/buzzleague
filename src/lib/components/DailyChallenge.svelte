<script lang="ts">
	import type { DailyChallenge } from '$lib/types/types';
	async function getDaily() {
		const dailyChallengeData: DailyChallenge = await fetch('/api/getDailyChallenge').then(
			(response) => response.json()
		);
		return dailyChallengeData;
	}
</script>

<article>
	{#await getDaily()}
		<div class="loading-article" aria-busy="true"></div>
	{:then data}
		<header><h2>Finished Leetcode's Daily Challenge?</h2></header>
		<h3><a data-sveltekit-reload target="_blank" href={data.link}>{data.title}</a></h3>
		<p><strong>Difficulty :</strong> {data.difficulty}</p>
		<p><strong>Acceptance Rate: </strong>{data.acceptanceRate}</p>
		<p><strong>Topics: </strong>{data.tags.join(', ')}</p>
	{/await}
</article>

<style>
	.loading-article {
		margin: 0 auto;
	}
	a {
		color: #c2c7d0;
	}
</style>
