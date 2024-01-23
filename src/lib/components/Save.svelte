<script lang="ts">
	import Save from '$lib/assets/assorted/Save.svg';
	let isSaving = false; // To disable the button while downloading
	async function downloadTopperCard() {
		isSaving = true;
		const image = await fetch('https://buzzleague-screenshot-api.onrender.com/').then((response) => response.text()); // The base64 image string
		const a = document.createElement('a');
		a.href = image; // Creating a anchor tag and the base64 string assigned to the href attribute.
		a.download = 'champion.jpeg';
		a.click(); // Starts the download
		isSaving = false;
	}
</script>

<button
	class="outline contrast"
	disabled={isSaving}
	aria-busy={isSaving ? true : false}
	on:click|trusted={downloadTopperCard}
	>{#if isSaving}Saving...{:else}<img src={Save} alt="download-icon" />Save{/if}</button
>

<style>
	img {
		height: 1em;
		width: auto;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
	}
</style>
