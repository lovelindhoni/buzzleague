<script lang="ts">
	import Logo from '$lib/assets/assorted/logo.svg';
	import GithubStars from '$lib/components/GithubStars.svelte';
</script>

<header class="container">
	<div class="title-logo">
		<img src={Logo} alt="logo" />
		<hgroup>
			<h1>BuzzLeague</h1>
			<p>League For CodeBees</p>
		</hgroup>
	</div>
	<div class="git-stars">
		<GithubStars />
	</div>
</header>

<style>
	header {
		display: flex;
		height: 10em;
		align-items: center;
		justify-content: space-between;
	}
	.title-logo {
		display: flex;

		gap: 1rem;
	}
	@media (max-width: 767px) {
		.title-logo {
			display: flex;
			width: inherit;
			justify-content: center;
			gap: 1rem;
		}
		.git-stars {
			display: flex;
			width: inherit;
			justify-content: end;
		}
		header {
			height: 14em;
			flex-direction: column-reverse;
		}
	}
	img {
		height: 4em;
		width: auto;
	}
</style>
