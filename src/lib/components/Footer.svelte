<script lang="ts">
	import Socials from '$lib/components/Socials.svelte';
</script>

<footer class="container">
	<p>
		BuzzLeague is a leaderboard app for CIT's students, ranking them based on their LeetCode skills.
		<br />
		For more info, check out the
		<a href="https://github.com/lovelindhoni/buzzleague/blob/main/README.md">readme</a>, and giving
		the repo a star would be super awesome! 🌟
	</p>
	<Socials />
	<p>developed and maintained by lovelin dhoni (1st Year AIML)</p>

	<a href="https://github.com/lovelindhoni/buzzleague?tab=MIT-1-ov-file"
		><small>&#169 MIT License</small></a
	>
</footer>

<style>
	.container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	footer p {
		text-align: center;
	}
	a {
		color: #c2c7d0;
	}
</style>
