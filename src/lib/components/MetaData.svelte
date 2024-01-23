<script lang="ts">
	export let title: string;
	export let description: string;
	export let url = 'https://buzzleague.vercel.app';
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
</svelte:head>
