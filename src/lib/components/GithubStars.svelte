<script lang="ts">
	import Github from '$lib/assets/socials/Github.svg';
	let ariaBusy = true;
	async function getStarCount() {
		const starCount = (await fetch('/api/getStars').then((response) => response.json())) as number;
		ariaBusy = false;
		return starCount;
	}
</script>

<button
	class="contrast outline"
	on:click={() => (window.location.href = 'https://github.com/lovelindhoni/buzzleague')}
	tabindex="0"
	on:keydown
	aria-busy={ariaBusy}
>
	{#await getStarCount()}
		<small>fetching</small>
	{:then starCount}
		<img src={Github} alt="github-logo" />
		<small>Stars | {starCount}</small>
	{:catch}
		<small>Failed to fetch stars</small>
	{/await}
</button>

<style>
	img {
		height: 1rem;
		width: 1rem;
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid;
		padding: 0.5rem;
		border-radius: 0.3rem;
		cursor: pointer;
		text-decoration: none;
		height: max-content;
	}
</style>
