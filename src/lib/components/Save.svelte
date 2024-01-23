<script lang="ts">
	import Save from '$lib/assets/assorted/Save.svg';
	import { toPng } from 'html-to-image';
	let isSaving = false; // To disable the button while downloading
	async function downloadTopperCard() {
		isSaving = true;
		const node = document.getElementById('topper') as HTMLElement;
		const dataUrl = await toPng(node, { filter: (node) => node.id !== 'save-btn' }).then(
			(response) => response
		); // Captures the element in base64 image format
		const a = document.createElement('a');
		a.href = dataUrl; // Creating a anchor tag and the base64 string assigned to the href attribute.
		a.download = 'champion.png';
		a.click(); // Starts the download
		isSaving = false;
	}
</script>

<button
	id="save-btn"
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
